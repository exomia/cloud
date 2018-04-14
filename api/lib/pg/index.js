import pg from 'pg'
import db_config from '../../.config/.db.config.json'

const pool = new pg.Pool(db_config)

pool.on('error', (err, client) => {
    console.error('idle client error', err, client)
})

class _LB {
    constructor(qp, ...values) {
        this.qp = qp
        this.values = values
    }
}

class _E {
    constructor(qp) {
        this.qp = qp
    }
}

/**
 * late binds a given sub query
 * @param {*} qp
 * @param {*} values
 * @returns {_LB} new _LB
 */
export const lb = (qp, ...values) => {
    return new _LB(qp, ...values)
}

/**
 * use the given argument explicit in the query
 * @param {*} qp
 * @param {*} values
 * @returns {_E} new _E
 */
export const e = (qp, ...values) => {
    let res = ''
    for (let i = 0; i < qp.length - 1; ++i) {
        res += qp[i] + values[i].toString()
    }
    return new _E(res + qp[qp.length - 1])
}

export const query = async (qp, ...values) => {
    let query = ''
    let index = 1
    for (let i = 0; i < qp.length - 1; ++i) {
        if (values[i] && values[i] instanceof _LB) {
            query += qp[i]
            for (let k = 0; k < values[i].qp.length - 1; ++k) {
                query += `${values[i].qp[k]}$${index++}`
            }
            query += values[i].qp[values[i].qp.length - 1]
            values.splice(i, 1, ...values[i].values)
        } else if (values[i] && values[i] instanceof _E) {
            query += qp[i] + values[i].qp
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
        console.error(query, values, err)
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
export const lbjoin = (...args) => {
    const qp = ['']
    const values = []

    for (let i = 0; i < args.length - 1; ++i) {
        if (args[i] && args[i] instanceof _LB) {
            qp[qp.length - 1] += args[i].qp[0]
            for (let k = 1; k < args[i].qp.length - 1; ++k) {
                qp.push(args[i].qp[k])
            }
            qp.push(args[i].qp[args[i].qp.length - 1] + ', ')
            values.push(...args[i].values)
        }
    }
    if (
        args.length > 0 &&
        args[args.length - 1] &&
        args[args.length - 1] instanceof _LB
    ) {
        qp[qp.length - 1] += args[args.length - 1].qp[0]
        for (let k = 1; k < args[args.length - 1].qp.length; ++k) {
            qp.push(args[args.length - 1].qp[k])
        }
        values.push(...args[args.length - 1].values)
    }
    return new _LB(qp, values)
}
