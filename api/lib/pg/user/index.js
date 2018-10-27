import { query, lb, lbjoin } from '../'

export async function addUser(username, email, password, scopes, volume) {
    const result = await query`
        INSERT INTO private.
        "user"("username", "email", "password", "scopes", "volume")
        VALUES (${username}, ${email}, crypt(${password}, gen_salt('bf', 8)), ${scopes}, ${volume});`
    return result && result.rowCount > 0
}

export async function deleteUser(usernameOrEmail) {
    const result = await query`
        DELETE FROM private."user"
        WHERE ("username" = ${usernameOrEmail} OR "email" = ${usernameOrEmail});`
    return result && result.rowCount > 0
}

export async function listAllUsers() {
    const result = await query`
        SELECT
          u."username",
          u."email",
          u."timestamp",
          u."scopes"                 AS "scopes",
          u."volume",
          COALESCE(SUM(f."size"), 0) AS "used_volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        GROUP BY u."uuid";`
    if (result && result.rowCount > 0) {
        return result
    }
    return false
}

export async function updateUser(usernameOrEmail, { new_username, new_email, new_password, new_scopes, new_volume }) {
    let updates = []
    if (new_username !== undefined) {
        updates.push(lb`"username" = ${new_username}`)
    }
    if (new_email !== undefined) {
        updates.push(lb`"email" = ${new_email}`)
    }
    if (new_password !== undefined) {
        updates.push(lb`"password" = crypt(${new_password}, gen_salt('bf', 8)`)
    }
    if (new_scopes !== undefined) {
        updates.push(lb`"scopes" = ${new_scopes}`)
    }
    if (new_volume !== undefined) {
        updates.push(lb`"volume" = ${new_volume}`)
    }
    if (updates.length <= 0) {
        return false
    }
    const result = await query`
        UPDATE private."user"
        SET ${lbjoin(...updates)}
        WHERE ("username" = ${usernameOrEmail} OR "email" = ${usernameOrEmail});`
    return result && result.rowCount > 0
}

export async function usedVolume(usernameOrEmail) {
    const result = await query`
        SELECT
          SUM(f."size") AS "used_volume",
          u."volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        WHERE (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
        GROUP BY u."uuid";`
    if (result && result.rowCount > 0) {
        return result.rows[0]
    }
    return false
}

export async function getUserInformation(usernameOrEmail) {
    const result = await query`
        SELECT
          u."username",
          u."email",
          u."timestamp",
          u."flags"                  AS "flags",
          u."volume",
          COALESCE(SUM(f."size"), 0) AS "used_volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        WHERE (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
        GROUP BY u."uuid";`
    if (result && result.rowCount > 0) {
        return result.rows[0]
    }
    return false
}
