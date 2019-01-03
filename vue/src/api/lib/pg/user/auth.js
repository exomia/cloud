import { query } from '../'

export async function checkLoginData(nameOrEmail, password) {
    const result = await query`
        SELECT
          u."name",
          u."email",
          u."password",
          u."timestamp",
          u."scopes"                 AS "scopes",
          u."volume",
          COALESCE(SUM(f."size"), 0) AS "used_volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        WHERE (u."email" = ${nameOrEmail} OR u."name" = ${nameOrEmail})
              AND u."password" = crypt(${password}, u."password")
        GROUP BY u."uuid";`
    if (!result && !result.rowCount) {
        return false
    }
    return result.rows[0]
}

export async function getUserPassword(nameOrEmail) {
    const result = await query`
        SELECT password
        FROM private."user"
        WHERE ("email" = ${nameOrEmail} OR "name" = ${nameOrEmail});`
    if (!result && !result.rowCount) {
        return false
    }
    return result.rows[0].password
}
