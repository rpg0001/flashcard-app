import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors';
import * as UserSessionService from "../services/userSessionService";
import { getUser } from '../services/userService';
import { logger } from '../utils/logger';

export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.session;

    if (!token) {
      logger.debug("No user is logged in");
      next();
      return;
    }

    const session = await UserSessionService.getUserSession(token);

    if (!session) {
      logger.debug("No user is logged in");
      next();
      return;
    }

    const user = await getUser(session.userId);

    if (!user) {
      throw new Error("Session user not found. User id: " + session.userId);
    }

    req.user = user.getBasic();
    
    req.session = {
      id: session.id,
      token: session.token,
    }

    logger.info("optionalAuth: success. userId " + user.id);
    next();
  } catch (error: any) {
    logger.info("optionalAuth: error with status " + error.status);
    next(error);
  }
}