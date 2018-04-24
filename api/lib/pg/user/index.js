import { query, lb, lbjoin } from '../'

export async function addUser(name, email, password, flags, volume) {
    const result = await query`
        INSERT INTO private."user" ("name", "email", "password", "flags", "volume")
        VALUES (${name}, ${email}, crypt(${password}, gen_salt('bf', 8)), ${flags}, ${volume});`
    return result && result.rowCount > 0
}

export async function deleteUser(nameOrEmail) {
    const result = await query`
        DELETE FROM private."user"
        WHERE ("name" = ${nameOrEmail} OR "email" = ${nameOrEmail});`
    return result && result.rowCount > 0
}

export async function listAllUsers() {
    const result = await query`
        SELECT
          u."name",
          u."email",
          u."timestamp",
          u."flags"                  AS "flags",
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

export async function updateUser(nameOrEmail, { new_name, new_email, new_password, new_flags, new_volume }) {
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
    if (new_flags !== undefined) {
        updates.push(lb`"flags" = ${new_flags}`)
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
        WHERE ("name" = ${nameOrEmail} OR "email" = ${nameOrEmail});`
    return result && result.rowCount > 0
}

export async function usedVolume(nameOrEmail) {
    const result = await query`
        SELECT
          SUM(f."size") AS "used_volume",
          u."volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        WHERE (u."name" = ${nameOrEmail} OR u."email" = ${nameOrEmail})
        GROUP BY u."uuid";`
    if (result && result.rowCount > 0) {
        return result.rows[0]
    }
    return false
}

export async function getUserInformation(nameOrEmail) {
    const result = await query`
        SELECT
          u."name",
          u."email",
          u."timestamp",
          u."flags"                  AS "flags",
          u."volume",
          COALESCE(SUM(f."size"), 0) AS "used_volume"
        FROM private."user" u
          LEFT JOIN private."file" f ON (u."uuid" = f."user_uuid")
        WHERE (u."name" = ${nameOrEmail} OR u."email" = ${nameOrEmail})
        GROUP BY u."uuid";`
    if (result && result.rowCount > 0) {
        return result.rows[0]
    }
    return false
}
