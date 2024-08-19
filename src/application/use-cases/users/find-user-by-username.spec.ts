import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { CreateUser } from "./create-user";
import { FindUserByUsername } from "./find-user-by-username";
import { User } from "@entities/user";

describe('Find user by username', () => {
  it('should be able to find a user by username', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new FindUserByUsername(usersRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR'
    })

    expect(sut.execute({
      username: user.username,
    })).resolves.toBeInstanceOf(User)
  })
})