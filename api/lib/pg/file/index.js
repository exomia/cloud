import {
    query,
    lb,
    lbjoin,
    e
} from '../'

export async function addFile(usernameOrEmail, directory_uuid, name, extension, local_name, mimetype, size) {
    const result = await query `
        INSERT INTO private."file" ("user_uuid","directory_uuid", "name", "extension", "local_name", "mimetype", "size")
        VALUES ((SELECT "uuid"
                 FROM private."user"
                 WHERE ("username" = ${usernameOrEmail} OR "email" = ${usernameOrEmail})),
                ${directory_uuid || null},
                ${name},
                ${extension},
                ${local_name},
                ${mimetype},
                ${size})
        RETURNING "uuid", "name", "extension", "mimetype", "size", "timestamp";`
    if (result && result.rowCount > 0) {
        return result.rows[0]
    }
    return false
}

export async function deleteFile(usernameOrEmail, file_uuid, force_delete) {
    const result = force_delete ?
        await query `
            DELETE FROM private."file" f
            USING private."user" u
            WHERE u."uuid" = f."user_uuid"
                  AND (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
                  AND f."uuid" = ${file_uuid};` :
        await query `
            UPDATE private."file" f
            SET f."delete_timestamp" = now()
            FROM private."user" u
            WHERE u."uuid" = f."user_uuid"
                  AND (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
                  AND f."uuid" = ${file_uuid};`
    return result && result.rowCount > 0
}

export async function listAllFiles(usernameOrEmail, directory_uuid) {
    const result = await query `
        SELECT
          f."uuid",
          f."name",
          f."extension",
          f."local_name",
          f."mimetype",
          f."size",
          f."timestamp",
          f."clamav_status",
          f."download_count"
        FROM private."file" f
          LEFT JOIN private."user" u ON (u."uuid" = f."user_uuid")
        WHERE (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
              AND f."directory_uuid" ${directory_uuid ? lb`= ${directory_uuid}` : e`IS NULL`}
        AND f."delete_timestamp" IS NULL;`
    if (result) {
        return result.rows
    }
    return false
}

export async function getFileInfo(usernameOrEmail, file_uuid) {
    const result = await query `
        SELECT
          f."uuid",
          f."name",
          f."extension",
          f."local_name",
          f."mimetype",
          f."size",
          f."timestamp",
          f."clamav_status",
          f."download_count",
          f."delete_timestamp"
        FROM private."file" f
          LEFT JOIN private."user" u ON (u."uuid" = f."user_uuid")
        WHERE (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
              AND f."uuid" = ${file_uuid};`
    if (result && result.rowCount > 0) {
        return result.rows[0]
    }
    return false
}

export async function updateFile(usernameOrEmail, file_uuid, {
    new_name,
    new_directory_uuid,
    new_clamav_status
}) {
    let updates = []
    if (new_name !== undefined) {
        updates.push(lb `"name" = ${new_name}`)
    }
    if (new_directory_uuid !== undefined) {
        updates.push(lb `"directory_uuid" = ${new_directory_uuid}`)
    }
    if (new_clamav_status !== undefined) {
        updates.push(lb `"clamav_status" = ${new_clamav_status}`)
    }
    if (updates.length <= 0) {
        return false
    }
    const result = await query `
        UPDATE private."file" f
        SET ${lbjoin(...updates)}
        FROM private."user" u
        WHERE u."uuid" = f."user_uuid"
              AND (u."username" = ${usernameOrEmail} OR u."email" = ${usernameOrEmail})
              AND f."uuid" = ${file_uuid};`
    return result && result.rowCount > 0
}

export async function increaseDownloadFileCount(file_uuid) {
    const result = await query `
        UPDATE private."file"
        SET "download_count" = "download_count" + 1
        WHERE "uuid" = ${file_uuid};`
    return result && result.rowCount > 0
}
