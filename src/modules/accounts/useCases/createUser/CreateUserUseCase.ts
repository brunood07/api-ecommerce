import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    firstName,
    lastName,
    document,
    phoneNumber,
    dateOfBirth,
    password,
    email,
  }: ICreateUserDTO): Promise<ICreateUserDTO> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) throw new AppError("User already exists!");

    const hashPassword = await hash(password, 10);

    const newUser = this.usersRepository.create({
      firstName,
      lastName,
      document,
      phoneNumber,
      dateOfBirth,
      password: hashPassword,
      email,
    });

    return newUser;
  }
}

export { CreateUserUseCase };
