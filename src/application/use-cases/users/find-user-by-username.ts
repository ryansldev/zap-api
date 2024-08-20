import { UsersRepository } from "@repositories/users-repository";
import { UserNotFound } from "./errors/UserNotFound";

interface FindUserByUsernameRequest {
  username: string
}

export class FindUserByUsername {
  constructor (private usersRepository: UsersRepository) {}

  async execute({ username }: FindUserByUsernameRequest) {
    const user = await this.usersRepository.findByUsername(username)
    if(!user) throw new UserNotFound();

    return user
  }
}