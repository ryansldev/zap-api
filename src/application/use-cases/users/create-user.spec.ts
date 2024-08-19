import { User } from "@entities/user";
import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { CreateUser } from "./create-user";

describe('Create User', () => {
  it('should be able to create a user', () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new CreateUser(usersRepository)

    expect(sut.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })).resolves.toBeInstanceOf(User)
  })
})