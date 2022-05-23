import { StatusCodes } from "http-status-codes";

export class HTTPError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export class BadRequest extends HTTPError {
    constructor(message) {
        super(message, StatusCodes.BAD_REQUEST)
    }
}

export class UnauthenticatedError extends HTTPError {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED)
    }
}

export class NotFoudError extends HTTPError {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND)
    }
}

export class ForbiddenError extends HTTPError {
    constructor(message) {
        super(message, StatusCodes.FORBIDDEN)
    }
}