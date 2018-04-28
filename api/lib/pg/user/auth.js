import { query } from '../'

export async function checkLoginData(usernameOrEmail, password) {
    const result = await query`
        SELECT
          u."username",
          u."email",
          u."password",
          u."timestamp",
          u."flags"                  AS "flags",
          u."volume",
          COALESCE(SUM(f."size"), 0) AS "used_volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        WHERE (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
              AND u."password" = crypt(${password}, u."password")
        GROUP BY u."uuid";`
    if (!result && result.rowCount <= 0) {
        return false
    }
    return result.rows[0]
}

export async function getUserPassword(usernameOrEmail) {
    const result = await query`
        SELECT password
        FROM private."user"
        WHERE ("username" = ${usernameOrEmail} OR "email" = ${usernameOrEmail});`
    if (!result && result.rowCount <= 0) {
        return false
    }
    return result.rows[0].password
}
