import pg from 'pg'
import db_config from '../../.config/.db.config.json'

pg.types.setTypeParser(20, 'text', parseInt)
pg.types.setTypeParser(1700, 'text', parseInt)

const pool = new pg.Pool(db_config)

pool.on('error', (err, client) => {
    console.error('idle client error', err, client)
})

/**
 * shutdown
 */
export async function shutdown() {
    await pool.end()
}

class _LB {
    constructor(qp, values) {
        this._qp = qp
        this._values = values
    }
}

class _E {
    constructor(qp) {
        this._qp = qp
    }
}

/**
 * late binds a given sub query
 * @param {*} qp
 * @param {*} values
 * @returns {_LB} new _LB
 */
export function lb(qp, ...values) {
    return new _LB(qp, values)
}

/**
 * use the given argument explicit in the query
 * @param {*} qp
 * @param {*} values
 * @returns {_E} new _E
 */
export function e(qp, ...values) {
    let res = ''
    for (let i = 0; i < qp.length - 1; ++i) {
        res += qp[i] + values[i].toString()
    }
    return new _E(res + qp[qp.length - 1])
}

/**
 * query
 * @param {*} qp
 * @param {*} values
 * @returns {Promise<pg.QueryResult | false}
 */
export async function query(qp, ...values) {
    let query = ''
    let index = 1
    for (let i = 0; i < qp.length - 1; ++i) {
        if (values[i] && values[i] instanceof _LB) {
            query += qp[i]
            for (let k = 0; k < values[i]._qp.length - 1; ++k) {
                query += `${values[i]._qp[k]}$${index++}`
            }
            query += values[i]._qp[values[i]._qp.length - 1]
            values.splice(i, 1, ...values[i]._values)
        } else if (values[i] && values[i] instanceof _E) {
            query += qp[i] + values[i]._qp
            values.splice(i, 1)
        } else {
            query += `${qp[i]}$${index++}`
        }
    }
    query += qp[qp.length - 1]
    const client = await pool.connect()
    try {
        return await client.query(query, values)
    } catch (err) {
        console.error(err, query, values)
        return false
    } finally {
        client.release()
    }
}

/**
 * join multiple late bindings to a single one separated with a comma
 * @param {*} args
 * @returns {_LB} new _LB
 */
export function lbjoin(...args) {
    const qp = ['']
    const values = []

    for (let i = 0; i < args.length - 1; ++i) {
        if (args[i] && args[i] instanceof _LB) {
            qp[qp.length - 1] += args[i].qp[0]
            for (let k = 1; k < args[i]._qp.length - 1; ++k) {
                qp.push(args[i]._qp[k])
            }
            qp.push(args[i]._qp[args[i]._qp.length - 1] + ', ')
            values.push(...args[i]._values)
        }
    }
    if (args.length > 0 && args[args.length - 1] && args[args.length - 1] instanceof _LB) {
        qp[qp.length - 1] += args[args.length - 1]._qp[0]
        for (let k = 1; k < args[args.length - 1]._qp.length; ++k) {
            qp.push(args[args.length - 1]._qp[k])
        }
        values.push(...args[args.length - 1]._values)
    }
    return new _LB(qp, values)
}
