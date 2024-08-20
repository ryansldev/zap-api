import { User } from "@entities/user";

interface UserHTTP {
  id: string;
  name: string;
  lastname: string;
  username: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserViewModel {
  static toHTTP(user: User): UserHTTP {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      location: user.location,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}