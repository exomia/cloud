import { query } from '../'

export async function checkLoginData(nameOrEmail, password) {
    const result = await query`
        SELECT
          name,
          email,
          password,
          flags
        FROM private."user"
        WHERE ("name" = ${nameOrEmail} OR "email" = ${nameOrEmail})
              AND "password" = crypt(${password}, "password");`
    if (!result && result.rowCount <= 0) {
        return false
    }
    return result.rows[0]
}

export async function getUserPassword(nameOrEmail) {
    const result = await query`
        SELECT password
        FROM private."user"
        WHERE ("name" = ${nameOrEmail} OR "email" = ${nameOrEmail});`
    if (!result && result.rowCount <= 0) {
        return false
    }
    return result.rows[0].password
}
