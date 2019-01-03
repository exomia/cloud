import { query, lb, lbjoin } from '../'

export async function addUser(name, email, password, scopes, volume) {
    const result = await query`
        INSERT INTO private."user" ("name", "email", "password", "scopes", "volume")
        VALUES (${name}, ${email}, public.crypt(${password}, public.gen_salt('bf', 8)), ${scopes}, ${volume});`
    return result && result.rowCount
}

export async function deleteUser(emailOrName) {
    const result = await query`
        DELETE FROM private."user"
        WHERE ("email" = ${emailOrName} OR "name" = ${emailOrName});`
    return result && result.rowCount
}

export async function listAllUsers() {
    const result = await query`
        SELECT
          u."name",
          u."email",
          u."timestamp",
          u."scopes"                 AS "scopes",
          u."volume",
          COALESCE(SUM(f."size"), 0) AS "used_volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        GROUP BY u."uuid";`
    if (result && result.rowCount) {
        return result
    }
    return false
}

export async function updateUser(
    emailOrName,
    { new_name, new_email, new_password, new_scopes, new_volume }
) {
    let updates = []
    if (new_name !== undefined) {
        updates.push(lb`"name" = ${new_name}`)
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
    if (!updates.length) {
        return false
    }
    const result = await query`
        UPDATE private."user"
        SET ${lbjoin(...updates)}
        WHERE ("email" = ${emailOrName} OR "name" = ${emailOrName});`
    return result && result.rowCount
}

export async function usedVolume(emailOrName) {
    const result = await query`
        SELECT
          SUM(f."size") AS "used_volume",
          u."volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        WHERE (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
        GROUP BY u."uuid";`
    if (result && result.rowCount) {
        return result.rows[0]
    }
    return false
}

export async function getUserInformation(emailOrName) {
    const result = await query`
        SELECT 
          u."uuid", 
          u."name",
          u."email",
          u."timestamp",
          u."scopes"                 AS "scopes",
          u."volume",
          COALESCE(SUM(f."size"), 0) AS "used_volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        WHERE (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
        GROUP BY u."uuid";`
    if (result && result.rowCount) {
        return result.rows[0]
    }
    return false
}
