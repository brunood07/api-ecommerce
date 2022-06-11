import { UsersTokensRepository } from "@modules/accounts/repositories/prisma/UsersTokensRepository";
import { Request, Response } from "express";

import { DayjsDateProvider } from "@shared/providers/DateProvider/Implementations/DayjsDateProvider";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenUseCase = new RefreshTokenUseCase(
      new UsersTokensRepository(),
      new DayjsDateProvider()
    );

    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json(refresh_token);
  }
}

export { RefreshTokenController };
