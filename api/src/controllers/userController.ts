
import { BadRequestError, ForbiddenError, NotFoundError } from '../utils/errors';
import * as UserService from '../services/userService';
import { logger } from '../utils/logger';

export async function getUser(req: any, res: any, next: any) {
    const id = Number(req.params?.id);
    try {
        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        const user = await UserService.getUser(req.params.id);
        if (!user) throw new NotFoundError(`Could not find user with id ${id}`);
        
        logger.info("getUser: success. userId: " + user.id);
        res.status(200).json(user.getBasic());
    } catch (error: any) {
        logger.error("getUser: error with status " + error.status + ". userId: " + id);
        next(error);
    }
}

export async function listUsers(req: any, res: any, next: any) {
    try {
        const users = await UserService.listUsers();

        logger.info("listUsers: success. Users found: " + users.length);
        return res.status(200).json(users.map(user => user.getBasic()));
    } catch (error: any) {
        logger.error("listUsers: error with status " + error.status);
        next(error);
    }
}

export async function updateUser(req: any, res: any, next: any) {
    const id = Number(req.params.id);
    try {
        const email = req.body?.email;
        const username = req.body?.username;

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');
        if (!email && !username) throw new BadRequestError('/body', 'missing required field: email, username');
        if (username && username.length > 23) throw new BadRequestError('/body/username', 'username must be 23 characters or less');
        if (email && email.length > 255) throw new BadRequestError('/body/email', 'email must be 255 characters or less');
        if (email && !email.includes("@")) throw new BadRequestError('/body/email', 'email must contain "@"');

        const user = await UserService.updateUser(id, email, username);
        
        logger.info("updateUser: success. userId: " + user.id);
        return res.status(200).json(user.getBasic());
    } catch (error: any) {
        logger.error("updateUser: error with status " + error.status + ". userId: " + id);
        next(error);
    }
}

export async function deleteUser(req: any, res: any, next: any) {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');
        if (id == req.user.id) throw new ForbiddenError('Cannot delete currently authenticated user');

        await UserService.deleteUser(req.params.id);
        
        logger.info("deleteUser: success. userId: " + id);
        return res.status(204).json();
    } catch (error: any) {
        logger.error("deleteUser: error with status " + error.status + ". userId: " + id);
        next(error);
    }
}