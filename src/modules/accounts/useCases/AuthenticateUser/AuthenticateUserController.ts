import { UsersRepository } from "@modules/accounts/repositories/prisma/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/prisma/UsersTokensRepository";
import { NextFunction, Request, Response } from "express";

import { DayjsDateProvider } from "@shared/providers/DateProvider/Implementations/DayjsDateProvider";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { password, email } = request.body;

      const authenticateUserUseCase = new AuthenticateUserUseCase(
        new UsersRepository(),
        new UsersTokensRepository(),
        new DayjsDateProvider()
      );

      const authenticateInfo = await authenticateUserUseCase.execute({
        password,
        email,
      });

      return response.json(authenticateInfo);
    } catch (err) {
      next(err);

      return null;
    }
  }
}

export { AuthenticateUserController };
