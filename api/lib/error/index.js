function e(status, msg) {
    const err = new Error(msg)
    err.status = status
    return err
}

function je(code, msg) {
    return { error: { code, msg } }
}

/**
 * TODO write method builder
 * then use
 * JERROR_NOT_FOUND(res)
 * to send json response with real status code
 */

export const ERROR_NO_CONTENT = e(204, 'No Content')
export const ERROR_BAD_REQUEST = e(400, 'Bad Request')
export const ERROR_NOT_FOUND = e(404, 'Not Found')
export const ERROR_INTERNAL_SERVER_ERROR = e(500, 'Internal Server Error')

export const SUCCESS = 0
export const ERROR = 1

export const JERROR_BAD_REQUEST = je(400, 'bad request')
export const JERROR_FORBIDDEN = je(403, 'forbidden')
export const JERROR_NOT_FOUND = je(404, 'not found')
export const JERROR_INTERNAL_SERVER_ERROR = je(500, 'internal server error')

export const JERROR_API_USAGE_ERROR = je(1001, 'api usage error')
export const JERROR_LOGIN_REQUIRED = je(1002, 'login required')
export const JERROR_INVALID_LOGIN = je(1003, 'invalid login')
export const JERROR_FILE_ALREADY_EXIST = je(1004, 'file already exist')

export const EXIT_LOGIN_REQUIRED = res => {
    res.status(200)
    return res.json(JERROR_LOGIN_REQUIRED)
}
