import { query } from '../'

export const checkLoginData = async (nameOrEmail, password) => {
  const result = await query`
        SELECT
          name,
          email,
          password,
          flags
        FROM private."user"
        WHERE ("name" = ${nameOrEmail} OR "email" = ${nameOrEmail})
              AND "password" = crypt(${password}, "password");`
  if (!result && result.rowCount <= 0) {
    return false
  }
  return result.rows[0]
}

export const getUserPassword = async nameOrEmail => {
  const result = await query`
        SELECT password
        FROM private."user"
        WHERE ("name" = ${nameOrEmail} OR "email" = ${nameOrEmail});`
  if (!result && result.rowCount <= 0) {
    return false
  }
  return result.rows[0].password
}
