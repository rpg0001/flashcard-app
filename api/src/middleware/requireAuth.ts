import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors';
import * as UserSessionService from "../services/userSessionService";
import { getUser } from '../services/userService';
import { logger } from '../utils/logger';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.session;

    if (!token) {
      throw new UnauthorizedError("Authentication required");
    }

    const session = await UserSessionService.getUserSession(token);

    if (!session) {
      logger.debug("Unauthorized - Could not find user session with given token");
      res.clearCookie('session');
      throw new UnauthorizedError("Invalid session");
    }

    if (session.expiresAt < new Date()) {
      logger.debug("Unauthorized - User session has expired, deleting session with id " + session.id);
      await UserSessionService.deleteUserSession(session.token);
      res.clearCookie('session');
      throw new UnauthorizedError("Session expired");
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

    logger.info("requireAuth: success. userId " + user.id);
    next();
  } catch (error: any) {
    logger.info("requireAuth: error with status " + error.status);
    next(error);
  }
}