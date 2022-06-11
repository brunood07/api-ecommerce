import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/prisma/UsersTokensRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/providers/DateProvider/Implementations/DayjsDateProvider";

interface ITokenRequest {
  email: string;
  password: string;
}

interface ITokenResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: UsersTokensRepository,
    private dateProvider: DayjsDateProvider
  ) {}

  async execute({ password, email }: ITokenRequest): Promise<ITokenResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) throw new AppError("Email or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Email or password incorrect");

    const token = sign({}, secret_token, {
      subject: String(user.id),
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: String(user.id),
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      Number(expires_refresh_token_days)
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: ITokenResponse = {
      token,
      user: {
        name: user.firstName,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
