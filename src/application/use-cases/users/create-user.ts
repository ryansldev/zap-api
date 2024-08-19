import { UsersRepository } from "@repositories/users-repository";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { User } from "@entities/user";

interface CreateUserRequest {
  name: string
  lastname: string
  email: string
  username: string
  password: string
  profilePic?: string
  location: string
}

export class CreateUser {
  constructor (private usersRepository: UsersRepository) {}

  async execute({
    name,
    lastname,
    email,
    username,
    password,
    profilePic,
    location
  }: CreateUserRequest) {
    const userAlreadyExists = await this.usersRepository.findByUsername(username)
    if(userAlreadyExists) throw new UserAlreadyExists();

    const user = new User({
      name,
      lastname,
      email,
      username,
      password,
      profilePic,
      location,
    })

    await user.hashPassword()

    await this.usersRepository.create(user)

    return user
  }
}