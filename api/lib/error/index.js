function e(status, msg) {
    const err = new Error(msg)
    err.status = status
    return err
}

function je(message, description) {
    return { error: { message, description } }
}

/*************************************************************************
/* UNUSED
/************************************************************************* 
 * export const ERROR_NO_CONTENT = e(204, 'No Content')
 * export const ERROR_BAD_REQUEST = e(400, 'Bad Request')
 * export const ERROR_NOT_FOUND = e(404, 'Not Found')
 * export const ERROR_INTERNAL_SERVER_ERROR = e(500, 'Internal Server Error')
 * 
 * export const SUCCESS = 0
 * export const ERROR = 1
 *************************************************************************/

export const JERROR_NO_CONTENT = (res, description) => res.status(204).json(je('no content', description))
export const JERROR_BAD_REQUEST = (res, description) => res.status(400).json(je('bad request', description))
export const JERROR_UNAUTHORIZED = (res, description) => res.status(401).json(je('unauthorized', description))
export const JERROR_FORBIDDEN = (res, description) => res.status(403).json(je('forbidden', description))
export const JERROR_NOT_FOUND = (res, description) => res.status(404).json(je('not found', description))
export const JERROR_METHOD_NOT_ALLOWED = (res, description) => res.status(405).json(je('method not allowed', description))
export const JERROR_INTERNAL_SERVER_ERROR = (res, description) => res.status(500).json(je('internal server error', description))
