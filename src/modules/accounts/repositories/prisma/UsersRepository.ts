import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { prisma } from "../../../../database/prismaClient";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  async create({
    email,
    password,
    username,
  }: ICreateUserDTO): Promise<ICreateUserDTO> {
    const newUser = await prisma.users.create({
      data: {
        username,
        password,
        email,
      },
    });

    return newUser;
  }

  async findByEmail(email: string): Promise<ICreateUserDTO> {
    const userByEmail = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    return userByEmail;
  }
}

export { UsersRepository };
