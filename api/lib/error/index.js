function e(status, msg) {
    const err = new Error(msg)
    err.status = status
    return err
}

function je(code, msg) {
    return { error: { code, msg } }
}

export const E204 = e(204, 'No Content')
export const E400 = e(400, 'Bad Request')
export const E404 = e(404, 'Not Found')
export const E500 = e(500, 'Internal Server Error')

export const SUCCESS = 0
export const ERROR = 1

export const JE400 = je(400, 'bad request')
export const JE404 = je(404, 'not found')
export const JE500 = je(500, 'internal server error')

export const JE1001 = je(1001, 'api usage error')
export const JE1002 = je(1002, 'login required')
