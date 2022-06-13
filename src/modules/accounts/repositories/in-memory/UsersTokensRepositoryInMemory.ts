import { ICreateUsersToken } from "@modules/accounts/dtos/ICreateUsersToken";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  tokens = [];

  async create({
    id,
    createad_at,
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersToken): Promise<ICreateUsersToken> {
    const userToken = {
      id,
      createad_at,
      expires_date,
      refresh_token,
      user_id,
    };

    this.tokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<ICreateUsersToken> {
    const userToken = await this.tokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = await this.tokens.find(
      (userToken) => userToken.id === id
    );
    this.tokens.splice(this.tokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<ICreateUsersToken> {
    const userToken = await this.tokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
