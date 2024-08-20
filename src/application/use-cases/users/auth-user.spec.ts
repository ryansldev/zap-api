import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { CreateUser } from "./create-user";
import { AuthUser } from "./auth-user";
import { UserNotFound } from "./errors/UserNotFound";
import { UserAuthError } from "./errors/UserAuthError";

describe('Auth user', () => {
  it('should be able to auth a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new AuthUser(usersRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    expect(sut.execute({
      username: 'johndoe',
      password: 'johndoe123'
    })).resolves.toEqual({ id: user.id })
  })

  it('should not be able to auth a user that not exists', () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthUser(usersRepository)

    expect(sut.execute({
      username: 'johndoe',
      password: 'johndoe123'
    })).rejects.toThrow(UserNotFound)
  })

  it('should not be able to auth a user with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new AuthUser(usersRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    expect(sut.execute({
      username: 'johndoe',
      password: 'johndoe1234'
    })).rejects.toThrow(UserAuthError)
  })
})