function je(ctx, status, message, description) {
    ctx.status = status
    ctx.body = { error: { message, description } }
}

export const JERROR_NO_CONTENT = (ctx, description) => je(ctx, 204, 'no content', description)
export const JERROR_BAD_REQUEST = (ctx, description) => je(ctx, 400, 'bad request', description)
export const JERROR_UNAUTHORIZED = (ctx, description) => je(ctx, 401, 'unauthorized', description)
export const JERROR_FORBIDDEN = (ctx, description) => je(ctx, 403, 'forbidden', description)
export const JERROR_NOT_FOUND = (ctx, description) => je(ctx, 404, 'not found', description)
export const JERROR_METHOD_NOT_ALLOWED = (ctx, description) =>
    je(ctx, 405, 'method not allowed', description)
export const JERROR_INTERNAL_SERVER_ERROR = (ctx, description) =>
    je(ctx, 500, 'internal server error', description)
