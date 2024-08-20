import { UsersRepository } from "@repositories/users-repository";
import { UserNotFound } from './errors/UserNotFound'
import { UserAuthError } from "./errors/UserAuthError";

interface AuthUserRequest {
  username: string;
  password: string;
}

export class AuthUser {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({ username, password }: AuthUserRequest) {
    const user = await this.usersRepository.findByUsername(username)
    if(!user) throw new UserNotFound();

    const isAuthenticated = await user.authenticate(password)
    if(!isAuthenticated) throw new UserAuthError();

    return { id: user.id }
  }
}