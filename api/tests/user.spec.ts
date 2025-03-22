import { test, expect } from '@playwright/test';

test('should create, fetch and delete a user', async ({ request }) => {
  /* Create new user */

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
  expect(Number(createUserResponseBody.id)).not.toBeNaN();
  expect(createUserResponseBody.email).toBe(createUserRequestBody.email);
  expect(createUserResponseBody.username).toBe(createUserRequestBody.username);


  /* Fetch new user */

  // Arrange
  const userId = Number(createUserResponseBody.id);

  // Act
  const getUserResponse = await request.get(`/users/${userId}`);

  // Assert
  expect(getUserResponse.status()).toBe(200);
  const getUserResponseBody = await getUserResponse.json();
  expect(Number(getUserResponseBody.id)).toBe(userId);
  expect(getUserResponseBody.email).toBe(createUserRequestBody.email);
  expect(getUserResponseBody.username).toBe(createUserRequestBody.username);


  /* Delete new user */

  // Arrange
  // Act
  const deleteUserResponse = await request.delete(`/users/${userId}`);

  // Assert
  expect(deleteUserResponse.status()).toBe(204);
})