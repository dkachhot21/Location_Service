import { constants } from "../constants.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : constants.INTERNAL_SERVER_ERROR;
    const errorTitle = getStatusTitle(statusCode);

    res.status(statusCode).json({
        title: errorTitle,
        statusCode: statusCode,
        message: err.message,
        // stackTrace: err.stack
    });

    next(err); // Call next to pass the error to the next error-handling middleware
};

// Helper function to get status code title for error responses
const getStatusTitle = (statusCode) => {
    switch (statusCode) {
        case constants.BAD_REQUEST:
            return "Bad Request";
        case constants.UNAUTHORIZED:
            return "Unauthorized";
        case constants.PAYMENT_REQUIRED:
            return "Payment Required";
        case constants.FORBIDDEN:
            return "Forbidden";
        case constants.NOT_FOUND:
            return "Not Found";
        case constants.METHOD_NOT_ALLOWED:
            return "Method Not Allowed";
        case constants.NOT_ACCEPTABLE:
            return "Not Acceptable";
        case constants.PROXY_AUTHENTICATION_REQUIRED:
            return "Proxy Authentication Required";
        case constants.TIMEOUT:
            return "Timeout";
        case constants.CONFLICT:
            return "Conflict";
        case constants.GONE:
            return "Gone";
        case constants.PRECONDITION_FAILED:
            return "Precondition Failed";
        case constants.ENTITY_TOO_LARGE:
            return "Entity Too Large";
        case constants.URI_TOO_LONG:
            return "URI Too Long";
        case constants.UNSUPPORTED_MEDIA_TYPE:
            return "Unsupported Media Type";
        case constants.RANGE_UNSATISFIABLE:
            return "Range Unsatisfiable";
        case constants.EXPECTATION_FAILED:
            return "Expectation Failed";
        case constants.LOCKED:
            return "Locked";
        case constants.TOO_MANY_REQUESTS:
            return "Too Many Requests";
        case constants.UNAVAILABLE_FOR_LEGAL_REASONS:
            return "Unavailable For Legal Reasons";
        case constants.INTERNAL_SERVER_ERROR:
            return "Internal Server Error";
        case constants.NOT_IMPLEMENTED:
            return "Not Implemented";
        case constants.BAD_GATEWAY:
            return "Bad Gateway";
        case constants.SERVICE_UNAVAILABLE:
            return "Service Unavailable";
        case constants.GATEWAY_TIMEOUT:
            return "Gateway Timeout";
        case constants.HTTP_VERSION_NOT_SUPPORTED:
            return "HTTP Version Not Supported";
        case constants.NETWORK_AUTHENTICATION_REQUIRED:
            return "Network Authentication Required";
        default:
            return "Unhandled Error"; // Default title for unhandled error codes
    }
};
