import { config } from "./config";
import { BadRequestError, UnauthorizedError } from "./errors";
// TODO proper validation

export function validateEmail(email?: string) {
    if (!email) throw new BadRequestError('/body/email', 'missing required field');
    if (email.length > 255) throw new BadRequestError('/body/email', 'email must be 255 characters or less');
    if (!email.includes("@")) throw new BadRequestError('/body/email', 'email must contain "@"');
    if (!email.includes(".")) throw new BadRequestError('/body/email', 'email must contain "@"');
}

export function validateUsername(username?: string) {
    if (!username) throw new BadRequestError('/body/username', 'missing required field');
    if (username.length > 23) throw new BadRequestError('/body/username', 'username must be 23 characters or less');
}

export function validateNewPassword(password?: string) {
    if (!password) throw new BadRequestError('/body/password', 'missing required field');
    if (password.length > 255)  throw new BadRequestError('/body/password', 'password must be 255 characters or less');
    if (password.length < 8)  throw new BadRequestError('/body/password', 'password must be 8 characters or more');
}

export function validateAdminKey(adminKey?: string) {
    if (!adminKey) throw new BadRequestError('/body/adminKey', 'missing required field');

    if (adminKey !== config.ADMIN_KEY) {
        throw new UnauthorizedError("Incorrect admin key provided");
    }
}