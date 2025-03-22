export class ErrorResponse {
    error: BaseError;
    constructor(error: BaseError) {
        this.error = error;
    }
}

export class BaseError extends Error {
    status: number;
    code: string;
    timestamp: string;

    constructor(status: number, code: string, message?: string) {
        super(message);
        this.status = status;
        this.code = code;
        this.timestamp = new Date().toISOString();
    }
}

// Non-BaseErrors will be wrapped as this
export class InternalServerError extends BaseError {
    constructor(message?: string) {
        super(500, 'INTERNAL_SERVER_ERROR', message)
    }
}

export class NotFoundError extends BaseError {
    constructor(message?: string) {
        super(404, 'NOT_FOUND', message)
    }
}

export class BadRequestError extends BaseError {
    source: {
        pointer: string;
    };
    constructor(pointer: string, message?: string) {
        super(400, 'BAD_REQUEST', message)
        this.source = { pointer: pointer };
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message?: string) {
        super(401, 'UNAUTHORIZED', message)
    }
}

export class ForbiddenError extends BaseError {
    constructor(message?:  string) {
        super(403, 'FORBIDDEN', message);
    }
}