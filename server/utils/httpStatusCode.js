const HTTP_STATUS_CODE = {
    // 2xx Success
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,

    // 4xx Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,

    // 5xx Server Errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503,
};

module.exports = HTTP_STATUS_CODE;
