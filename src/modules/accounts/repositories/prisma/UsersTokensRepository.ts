import { ICreateUsersToken } from "@modules/accounts/dtos/ICreateUsersToken";

import { prisma } from "../../../../database/prismaClient";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepository implements IUsersTokensRepository {
  async create({ expires_date, refresh_token, user_id }: ICreateUsersToken) {
    const userToken = await prisma.tokens.create({
      data: {
        expires_date,
        refresh_token,
        user_id,
      },
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<ICreateUsersToken> {
    const find = await prisma.tokens.findFirst({
      where: {
        user_id: {
          equals: user_id,
        },
        refresh_token: {
          equals: refresh_token,
        },
      },
    });

    return find;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.tokens.delete({
      where: {
        id,
      },
    });
  }

  async findByRefreshToken(refresh_token: string): Promise<ICreateUsersToken> {
    const findByRefresh = await prisma.tokens.findFirst({
      where: {
        refresh_token: {
          equals: refresh_token,
        },
      },
    });

    return findByRefresh;
  }
}
