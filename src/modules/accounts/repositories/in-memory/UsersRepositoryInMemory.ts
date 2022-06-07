import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users = [];

  async create({ username, password, email }): Promise<ICreateUserDTO> {
    const user = {
      username,
      password,
      email,
    };

    this.users.push(user);

    return user;
  }

  findByEmail(email: string): Promise<ICreateUserDTO> {
    const userByEmail = this.users.find((user) => user.email === email);

    return userByEmail;
  }
}

export { UsersRepositoryInMemory };
