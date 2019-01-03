import { query } from '../'

export async function addPasswordRecovery(user_uuid) {
    const result = await query`
        INSERT INTO private."forgotpassword" ("user_uuid") VALUES (${user_uuid})
        ON CONFLICT (user_uuid) DO UPDATE SET uuid = default, timestamp = default
        WHERE timestamp + INTERVAL '30 minute' < CURRENT_TIMESTAMP
        RETURNING uuid;`
    if (result && result.rowCount) {
        return result.rows[0]
    }
    return false
}
