import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/errors";
import * as UserService from "../services/userService";
import * as UserSessionService from "../services/userSessionService";
import { validateAdminKey, validateEmail, validateNewPassword, validateUsername } from "../utils/validation";
import bcrypt from 'bcryptjs';
import { logger } from "../utils/logger";
import { UserType } from "../models/userModel";

export async function signUp(req: any, res: any, next: any) {
    try {
        const email = req.body?.email;
        const username = req.body?.username;
        const password = req.body?.password;

        // Validate request properties
        validateEmail(email);
        validateUsername(username);
        validateNewPassword(password);

        // Check user doesn't exist
        const existingUsers = await UserService.searchUsers(username, email);
        if (existingUsers.length > 0) {
            throw new BadRequestError('/body', 'User already exists');
        }

        // Create new user
        const user = await UserService.createUser(email, username, password, UserType.BASIC);

        // Create new user session
        const newSession = await UserSessionService.createUserSession(user.id);

        // Set session cookie
        res.cookie("session", newSession.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: newSession.expiresAt,
        });

        logger.info("signUp: success");
        // Return user details
        res.status(201).json(user.getBasic());
    } catch (error: any) {
        logger.error("signUp: error with status " + error.status);
        next(error);
    }
}

export async function signIn(req: any, res: any, next: any) {
    try {
        const email = req.body?.email;
        const password = req.body?.password;

        // Validate request properties
        if (!password) throw new BadRequestError('/body/password', 'missing required field');
        validateEmail(email);

        // Find user
        const users = await UserService.searchUsers(undefined, email);
        
        if (users.length > 1) {
            throw new Error("More than one user found with email")
        }

        if (users.length < 1) {
            throw new UnauthorizedError("User does not exist");
        }

        const user = users[0];

        // Verify password
        const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

        if (!passwordIsValid) {
            throw new UnauthorizedError("Incorrect credentials provided");
        }

        // Create new user session
        const newSession = await UserSessionService.createUserSession(user.id);

        // Set session cookie
        res.cookie("session", newSession.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: newSession.expiresAt,
        });

        logger.info("signIn: success");
        // Return user details
        res.status(201).json(user.getBasic());
    } catch (error: any) {
        logger.error("signIn: error with status " + error.status);
        next(error);
    }
}

export async function signOut(req: any, res: any, next: any) {
    try {
        const token = req.cookies?.session;

        if (token) {
            // Delete session
            await UserSessionService.deleteUserSession(token);
            res.clearCookie("session");
        } else {
            logger.info("signOut - user is not signed in");
        }

        logger.info("signOut: success - signed out user");
        res.json({ "message": "Successfully signed out"});
    } catch (error: any) {
        logger.error("signOut: error with status " + error.status);
        next(error);
    }
}

export async function getMe(req: any, res: any, next: any) {
    try {
        const token = req.cookies?.session;

        if (!token) {
            logger.info("getMe: User is not signed in");
            res.status(200).json({ "user": null });
            return;
        }

        const session = await UserSessionService.getUserSession(token);

        if (!session || session.expiresAt < new Date()) {
            res.clearCookie("session");
            throw new UnauthorizedError("Invalid session");
        }

        const user = await UserService.getUser(session.userId);

        if (!user) { 
            throw new NotFoundError("User associated with session not found");
        }

        logger.info("getMe: success");
        res.status(200).json({
            "user" : user.getBasic()
        });
    } catch (error: any) {
        logger.error("getMe: error with status " + error.status);
        next(error);
    }
}

export async function signUpAdmin(req: any, res: any, next: any) {
    try {
        const email = req.body?.email;
        const username = req.body?.username;
        const password = req.body?.password;
        const adminKey = req.body?.adminKey;

        // Validate request properties
        validateEmail(email);
        validateUsername(username);
        validateNewPassword(password);
        validateAdminKey(adminKey);

        // Check user doesn't exist
        const existingUsers = await UserService.searchUsers(username, email);
        if (existingUsers.length > 0) {
            throw new BadRequestError('/body', 'User already exists');
        }

        // Create new user
        const user = await UserService.createUser(email, username, password, UserType.ADMIN);

        // Create new user session
        const newSession = await UserSessionService.createUserSession(user.id);

        // Set session cookie
        res.cookie("session", newSession.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: newSession.expiresAt,
        });

        logger.info("signUpAdmin: success");
        // Return user details
        res.status(201).json(user.getBasic());
    } catch (error: any) {
        logger.error("signUpAdmin: error with status " + error.status);
        next(error);
    }
}