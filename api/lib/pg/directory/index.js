import { query, lb, lbjoin, e } from '../'

export async function addDirectory(usernameOrEmail, name, parent_directory_uuid) {
    let result = false
    if (parent_directory_uuid) {
        const dires = await getDirectoryInfo(usernameOrEmail, parent_directory_uuid)
        if (!dires) {
            return false
        }
        if (dires.path_info_json.length === 3) {
            dires.path_info_json.splice(0, 1, false)
        } else if (dires.path_info_json.length === 4) {
            dires.path_info_json.splice(1, 1)
        }
        dires.path_info_json.push({ name: dires.name, uuid: dires.uuid })
        result = await query`
            INSERT INTO private."directory" ("user_uuid", "name", "parent_directory_uuid", "path_info_json")
            VALUES ((SELECT "uuid"
                     FROM private."user"
                     WHERE ("username" = ${usernameOrEmail} OR "email" = ${usernameOrEmail})),
                    ${name},
                    ${parent_directory_uuid},
                    ${JSON.stringify(dires.path_info_json)})
            RETURNING "uuid", "name", "timestamp";`
    } else {
        result = await query`
            INSERT INTO private."directory" ("user_uuid", "name")
            VALUES ((SELECT "uuid"
                     FROM private."user"
                     WHERE ("username" = ${usernameOrEmail} OR "email" = ${usernameOrEmail})),
                    ${name})
            RETURNING "uuid", "name", "timestamp";`
    }
    if (result && result.rowCount > 0) {
        return result.rows[0]
    }
    return false
}

export async function deleteDirectory(usernameOrEmail, directory_uuid, force_delete) {
    const result = force_delete
        ? await query`
            DELETE FROM private."directory" d
            USING private."user" u
            WHERE u."uuid" = d."user_uuid"
                  AND (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
                  AND d."uuid" = ${directory_uuid};`
        : await query`
            UPDATE private."directory" d
            SET d."delete_timestamp" = now()
            FROM private."user" u
            WHERE u."uuid" = d."user_uuid"
                  AND (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
                  AND d."uuid" = ${directory_uuid};`
    return result && result.rowCount > 0
}

export async function listAllDirectories(usernameOrEmail, parent_directory_uuid) {
    const result = await query`
        SELECT
          d."uuid",
          d."name",
          d."timestamp",
          d."download_count",
          SUM(f."size") AS "size",
          max(f."clamav_status") AS "clamav_status"
        FROM private."directory" d
          LEFT JOIN private."user" u ON (u."uuid" = d."user_uuid")
          LEFT JOIN private."file" f ON (d."uuid" = f."directory_uuid")
        WHERE (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
              AND d."parent_directory_uuid" ${parent_directory_uuid ? lb`= ${parent_directory_uuid}` : e`IS NULL`}
        AND d."delete_timestamp" IS NULL
        GROUP BY d."uuid";`
    if (result) {
        return result.rows
    }
    return false
}

export async function getDirectoryInfo(usernameOrEmail, directory_uuid) {
    if (!directory_uuid) {
        return false
    }
    const result = await query`
        SELECT
          d."uuid",
          d."name",
          d."parent_directory_uuid",
          d."path_info_json",
          d."timestamp",
          d."download_count",
          SUM(f."size")          AS "size",
          max(f."clamav_status") AS "clamav_status"
        FROM private."directory" d
          LEFT JOIN private."user" u ON (u."uuid" = d."user_uuid")
          LEFT JOIN private."file" f ON (d."uuid" = f."directory_uuid")
        WHERE (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
              AND d."uuid" = ${directory_uuid}
              AND d."delete_timestamp" IS NULL
        GROUP BY d."uuid";`
    if (result && result.rowCount > 0) {
        return result.rows[0]
    }
    return false
}

export async function updateDirectory(usernameOrEmail, directory_uuid, { new_name, new_parent_directory_uuid }) {
    let updates = []
    if (new_name !== undefined) {
        updates.push(lb`"name" = ${new_name}`)
    }
    if (new_parent_directory_uuid !== undefined) {
        if (new_parent_directory_uuid !== 'NULL') {
            const dires = getDirectoryInfo(usernameOrEmail, new_parent_directory_uuid)
            if (!dires) {
                return false
            }
            if (dires.path_info_json.length === 3) {
                dires.path_info_json.splice(0, 1, false)
            } else if (dires.path_info_json.length === 4) {
                dires.path_info_json.splice(1, 1)
            }
            dires.path_info_json.push({ name: dires.name, uuid: dires.uuid })
            updates.push(
                lb`"parent_directory_uuid" = ${new_parent_directory_uuid}, "path_info_json" = ${dires.path_info_json}`
            )
        } else {
            updates.push(lb`"parent_directory_uuid" = NULL, "path_info_json" = '[]'`)
        }
    }
    if (updates.length <= 0) {
        return false
    }
    const result = await query`
        UPDATE private."directory" d
        SET ${lbjoin(...updates)}
        FROM private."user" u
        WHERE u."uuid" = d."user_uuid"
              AND (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
              AND d."uuid" = ${directory_uuid};`
    return result && result.rowCount > 0
}
