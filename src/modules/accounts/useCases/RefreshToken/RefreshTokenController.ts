import { UsersTokensRepository } from "@modules/accounts/repositories/prisma/UsersTokensRepository";
import { Request, Response } from "express";

import { DayjsDateProvider } from "@shared/providers/DateProvider/Implementations/DayjsDateProvider";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.headers["x-access-token"] || req.query.token;

    const refreshTokenUseCase = new RefreshTokenUseCase(
      new UsersTokensRepository(),
      new DayjsDateProvider()
    );

    const refresh_token = await refreshTokenUseCase.execute(token);

    return res.json(refresh_token);
  }
}

export { RefreshTokenController };
