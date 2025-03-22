import { test, expect } from '@playwright/test';

test('should create, fetch and delete a note', async ({ request }) => {
    /* Create new user to own the note*/

    // Arrange
    const createUserRequestBody = {
        "email": "test_user@example.com",
        "username": "test_user"
    }

    // Act
    const createUserResponse = await request.post("/users", { "data": createUserRequestBody });

    // Assert
    expect(createUserResponse.status()).toBe(201);
    const createUserResponseBody = await createUserResponse.json();
    const userId = Number(createUserResponseBody.id);
    expect(userId).not.toBeNaN();


    /* Create new note */

    // Arrange
    const createNoteRequestBody = {
        "title": "Test note",
        "content": "This is a test note",
        "userId": userId
    }

    // Act
    const createNoteResponse = await request.post("/notes", { "data": createNoteRequestBody });

    // Assert
    expect(createNoteResponse.status()).toBe(201);
    const createNoteResponseBody = await createNoteResponse.json();
    const noteId = Number(createNoteResponseBody.id);
    expect(noteId).not.toBeNaN();
    expect(createNoteResponseBody.title).toBe(createNoteRequestBody.title);
    expect(createNoteResponseBody.content).toBe(createNoteRequestBody.content);
    expect(createNoteResponseBody.userId).toBe(userId);
    

    /* Fetch new note */

    // Arrange
    // Act
    const getNoteResponse = await request.get(`/notes/${noteId}`);

    // Assert
    expect(getNoteResponse.status()).toBe(200);
    const getNoteResponseBody = await getNoteResponse.json();
    console.log(getNoteResponse);
    console.log(getNoteResponseBody);
    expect(Number(getNoteResponseBody.id)).toBe(noteId);
    expect(getNoteResponseBody.title).toBe(createNoteRequestBody.title);
    expect(getNoteResponseBody.content).toBe(createNoteRequestBody.content);
    expect(getNoteResponseBody.userId).toBe(userId);


    /* Delete new note */

    // Arrange
    // Act
    const deleteNoteResponse = await request.delete(`/notes/${noteId}`);

    // Assert
    expect(deleteNoteResponse.status()).toBe(204);
})