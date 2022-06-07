import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    username,
    password,
    email,
  }: ICreateUserDTO): Promise<ICreateUserDTO> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) throw new AppError("User already exists!");

    const hashPassword = await hash(password, 10);

    const newUser = this.usersRepository.create({
      username,
      password: hashPassword,
      email,
    });

    return newUser;
  }
}

export { CreateUserUseCase };
