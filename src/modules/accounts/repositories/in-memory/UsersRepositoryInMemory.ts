import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users = [];

  async create({
    firstName,
    lastName,
    document,
    phoneNumber,
    dateOfBirth,
    password,
    email,
  }): Promise<ICreateUserDTO> {
    const user = {
      firstName,
      lastName,
      document,
      phoneNumber,
      dateOfBirth,
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
