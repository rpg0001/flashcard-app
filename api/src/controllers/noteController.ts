
import { BadRequestError, ForbiddenError, NotFoundError } from '../utils/errors';
import * as NoteService from '../services/noteService';
import { logger } from '../utils/logger';

export async function getNote(req: any, res: any, next: any) {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        const note = await NoteService.getNote(req.params.id);
        if (!note) throw new NotFoundError(`Could not find note with id ${id}`);
        if (note.userId !== req.user.id) throw new ForbiddenError(`User id ${req.user.id} does not match note user id ${note.userId}`);
        
        logger.info("getNote: success. noteId: " + note.id);
        res.status(200).json(note);
    } catch (error: any) {
        logger.info("getNote: error with status " + error.status + ". noteId: " + id);
        next(error);
    }
}

export async function listNotes(req: any, res: any, next: any) {
    const userIdString = req.user?.id;
    try {
        const userId = userIdString;
        if (userIdString && isNaN(userId)) throw new BadRequestError('/user', 'userId must be a number');

        const notes = await NoteService.listNotes(userIdString ? userId : null);

        logger.info("listNotes: success. Notes found: " + notes.length);
        return res.status(200).json(notes);
    } catch (error: any) {
        logger.info("listNotes: error with status " + error.status + ". userId: " + userIdString);
        next(error);
    }
}

export async function createNote(req: any, res: any, next: any) {
    const userIdString = req.user?.id;
    try {
        const title = req.body?.title;
        const content = req.body?.content;

        if (!title) throw new BadRequestError('/body/title', 'missing required field');
        if (!content) throw new BadRequestError('/body/content', 'missing required field');

        const userId = Number(userIdString);
        const note = await NoteService.createNote(title, content, userId);

        logger.info("createNote: success. noteId " + note?.id + ". userId: " + userIdString);
        return res.status(201).json(note);
    } catch (error: any) {
        logger.info("createNote: error with status " + error.status + ". userId: " + userIdString);
        next(error);
    }
}

export async function updateNote(req: any, res: any, next: any) {
    const id = Number(req.params?.id);
    try {
        const title = req.body?.title;
        const content = req.body?.content;

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');
        if (!title && !content) throw new BadRequestError('/body', 'missing required field: title, content');
        if (title && title.length > 255) throw new BadRequestError('/body/title', 'title must be 255 characters or less');
        if (content && content.length > 1023) throw new BadRequestError('/body/content', 'content must be 1023 characters or less');

        const note = await NoteService.getNote(id);
        if (!note) throw new NotFoundError(`Could not find note with id ${id}`);
        if (note.userId !== req.user?.id) throw new ForbiddenError(`User id ${req.user.id} does not match note user id ${note.userId}`);
        
        const updatedNote = await NoteService.updateNote(id, title, content);

        logger.info("updateNote: success. noteId " + id);
        return res.status(200).json(updatedNote);
    } catch (error: any) {
        logger.info("updateNote: error with status " + error.status + ". noteId: " + id);
        next(error);
    }
}

export async function deleteNote(req: any, res: any, next: any) {
    const id = Number(req.params?.id);
    try {
        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        const note = await NoteService.getNote(id);
        if (!note) throw new NotFoundError(`Could not find note with id ${id}`);
        if (note.userId !== req.user?.id) throw new ForbiddenError(`User id ${req.user.id} does not match note user id ${note.userId}`);
        
        await NoteService.deleteNote(req.params.id);

        logger.info("deleteNote: success. noteId " + id);
        return res.status(204).json();
    } catch (error: any) {
        logger.info("deleteNote: error with status " + error.status + ". noteId: " + id);
        next(error);
    }
}