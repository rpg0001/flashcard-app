import { NextFunction } from "express";
import { UserType } from "../models/userModel";
import { ForbiddenError } from "../utils/errors";
import { logger } from "../utils/logger";

export async function requireAdmin(req: any, res: any, next: NextFunction) {
    try {
      if (req.user?.userType != UserType.ADMIN) {
        throw new ForbiddenError("Route restricted to ADMIN users only");
      }
  
      logger.info("requireAdmin: success. userId " + req.user?.id);
      next();
    } catch (error: any) {
      logger.info("requireAdmin: error with status " + error.status);
      next(error);
    }
}