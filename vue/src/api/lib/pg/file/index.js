import { query, lb, lbjoin, e } from '../'

export async function addFile(
    emailOrName,
    directory_uuid,
    name,
    extension,
    local_name,
    mimetype,
    size
) {
    const result = await query`
        INSERT INTO private."file" ("user_uuid", "directory_uuid", "name", "extension", "local_name", "mimetype", "size")
        VALUES ((SELECT "uuid"
                 FROM private."user"
                 WHERE ("email" = ${emailOrName} OR "name" = ${emailOrName})),
                ${directory_uuid || null},
                ${name},
                ${extension},
                ${local_name},
                ${mimetype},
                ${size})
        RETURNING "uuid", "name", "extension", "mimetype", "size", "timestamp";`
    if (result && result.rowCount) {
        return result.rows[0]
    }
    return false
}

export async function deleteFile(emailOrName, file_uuid, force_delete) {
    const result = force_delete
        ? await query`
            DELETE FROM private."file" f
            USING private."user" u
            WHERE u."uuid" = f."user_uuid"
                  AND (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
                  AND f."uuid" = ${file_uuid};`
        : await query`
            UPDATE private."file" f
            SET f."delete_timestamp" = now()
            FROM private."user" u
            WHERE u."uuid" = f."user_uuid"
                  AND (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
                  AND f."uuid" = ${file_uuid};`
    return result && result.rowCount
}

export async function listAllFiles(emailOrName, directory_uuid) {
    const result = await query`
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
        WHERE (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
              AND f."directory_uuid" ${directory_uuid ? lb`= ${directory_uuid}` : e`IS NULL`}
        AND f."delete_timestamp" IS NULL;`
    if (result) {
        return result.rows
    }
    return false
}

export async function getFileInfo(emailOrName, file_uuid) {
    const result = await query`
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
        WHERE (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
              AND f."uuid" = ${file_uuid};`
    if (result && result.rowCount) {
        return result.rows[0]
    }
    return false
}

export async function updateFile(
    emailOrName,
    file_uuid,
    { new_directory_uuid, new_name, new_local_name, new_size, new_clamav_status }
) {
    let updates = []
    if (new_directory_uuid !== undefined) {
        updates.push(lb`"directory_uuid" = ${new_directory_uuid}`)
    }
    if (new_name !== undefined) {
        updates.push(lb`"name" = ${new_name}`)
    }
    if (new_local_name !== undefined) {
        updates.push(lb`"local_name" = ${new_local_name}`)
    }
    if (new_local_name !== undefined) {
        updates.push(lb`"size" = ${new_size}`)
    }
    if (new_clamav_status !== undefined) {
        updates.push(lb`"clamav_status" = ${new_clamav_status}`)
    }
    if (!updates.length) {
        return false
    }
    const result = await query`
        UPDATE private."file" f
        SET ${lbjoin(...updates)}
        FROM private."user" u
        WHERE u."uuid" = f."user_uuid"
              AND (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
              AND f."uuid" = ${file_uuid}
        RETURNING "uuid", "name", "extension", "mimetype", "size", "timestamp";`
    if (result && result.rowCount) {
        return result.rows[0]
    }
    return false
}

export async function replaceFile(
    emailOrName,
    directory_uuid,
    name,
    extension,
    new_local_name,
    new_mimetype,
    new_size
) {
    const result = await query`
        UPDATE private."file" f
        SET "local_name" = ${new_local_name}, "size" = ${new_size}, "new_mimetype" = ${new_mimetype}
        FROM private."user" u
        WHERE u."uuid" = f."user_uuid"
              AND (u."email" = ${emailOrName} OR u."name" = ${emailOrName})
              AND f."directory_uuid" ${directory_uuid ? lb`= ${directory_uuid}` : e`IS NULL`}
              AND f."name" = ${name}
              AND f."extension" = ${extension}
        RETURNING "uuid", "name", "extension", "mimetype", "size", "timestamp";`
    if (result && result.rowCount) {
        return result.rows[0]
    }
    return false
}

export async function increaseDownloadFileCount(file_uuid) {
    const result = await query`
        UPDATE private."file"
        SET "download_count" = "download_count" + 1
        WHERE "uuid" = ${file_uuid};`
    return result && result.rowCount
}
