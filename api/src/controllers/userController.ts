
import { BadRequestError, NotFoundError } from '../utils/errors';
import * as UserService from '../services/userService';
import { logger } from '../utils/logger';

export async function getUser(req: any, res: any, next: any) {
    const id = Number(req.params?.id);
    try {
        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        const user = await UserService.getUser(req.params.id);
        if (!user) throw new NotFoundError(`Could not find user with id ${id}`);
        
        logger.info("getUser: success. userId: " + user.id);
        res.status(200).json(user.getPublic());
    } catch (error: any) {
        logger.error("getUser: error with status " + error.status + ". userId: " + id);
        next(error);
    }
}

export async function listUsers(req: any, res: any, next: any) {
    try {
        const users = await UserService.listUsers();

        logger.info("listUsers: success. Users found: " + users.length);
        return res.status(200).json(users.map(user => user.getPublic()));
    } catch (error: any) {
        logger.error("listUsers: error with status " + error.status);
        next(error);
    }
}