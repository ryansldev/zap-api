import { User } from "../entities/user";

export interface UsersRepository {
  create(user: User): Promise<void>
  findByUsername(username: string): Promise<User | undefined>
  save(user: User): Promise<void>
}