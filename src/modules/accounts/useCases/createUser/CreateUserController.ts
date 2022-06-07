import { UsersRepository } from "@modules/accounts/repositories/prisma/UsersRepository";
import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      firstName,
      lastName,
      document,
      phoneNumber,
      dateOfBirth,
      password,
      email,
    } = req.body;

    const createUserUseCase = new CreateUserUseCase(new UsersRepository());

    const result = await createUserUseCase.execute({
      firstName,
      lastName,
      document,
      phoneNumber,
      dateOfBirth,
      password,
      email,
    });

    return res.status(200).json(result);
  }
}

export { CreateUserController };
