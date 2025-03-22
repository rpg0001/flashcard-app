import { config } from "../utils/config";
import { BaseError, ErrorResponse, InternalServerError } from "../utils/errors";
import { logger } from "../utils/logger";

function errorHandler(
    err: any, 
    req: any, 
    res: any, 
    next: any
) {
    try {
        logger.debug("Handling error");
        
        const baseError: BaseError = err instanceof BaseError
            ? err
            : new InternalServerError();

        if (baseError.status >= 500) {
            logger.error(config.NODE_ENV === 'development' ? err.stack : `Error: ${err.message}`);
        } else {
            logger.error(`Client error: ${err.message}`);
        }
    
        return res
            .status(baseError.status)
            .json(new ErrorResponse(baseError));
    } catch (error: any) {
        console.error("Error handling error: " + error.message);
        const baseError = new InternalServerError();
        return res
            .status(500)
            .json(new ErrorResponse(baseError));
    }
}

module.exports = errorHandler;