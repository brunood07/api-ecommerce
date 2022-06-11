import { ICreateUsersToken } from "../dtos/ICreateUsersToken";

export interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersToken): Promise<ICreateUsersToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<ICreateUsersToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<ICreateUsersToken>;
}
