import { User } from "@entities/user";
import { UsersRepository } from "@repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.items.find((user) => user.username === username)
  }

  async findById(id: string): Promise<User | undefined> {
    return this.items.find((user) => user.id === id)
  }

  async save(user: User): Promise<void> {
    const index = this.items.indexOf(user)
    if (index !== -1) {
      this.items[index] = user
    }
  }
}