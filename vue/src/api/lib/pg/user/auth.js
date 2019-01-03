import { query } from '../'

export async function checkLoginData(emailOrName, password) {
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
        WHERE (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
              AND u."password" = crypt(${password}, u."password")
        GROUP BY u."uuid";`
    if (!result && !result.rowCount) {
        return false
    }
    return result.rows[0]
}

export async function getUserPassword(emailOrName) {
    const result = await query`
        SELECT password
        FROM private."user"
        WHERE ("email" = ${emailOrName} OR "name" = ${emailOrName});`
    if (!result && !result.rowCount) {
        return false
    }
    return result.rows[0].password
}
