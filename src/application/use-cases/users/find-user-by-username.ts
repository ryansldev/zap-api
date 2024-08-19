import { UsersRepository } from "@repositories/users-repository";

interface FindUserByUsernameRequest {
  username: string
}

export class FindUserByUsername {
  constructor (private usersRepository: UsersRepository) {}

  async execute({ username }: FindUserByUsernameRequest) {
    return await this.usersRepository.findByUsername(username)
  }
}