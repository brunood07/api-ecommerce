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

    if (password.length < 8)
      throw new AppError("Password must be at least 8 characters");

    if (password.search(/[A-Z]/) < 0)
      throw new AppError(
        "Password must have at least one upper case character"
      );

    if (password.search(/[a-z]/) < 0)
      throw new AppError(
        "Password must have at least one lower case character"
      );

    if (!password.match(/([0-9])/))
      throw new AppError("Password must have at least a number");

    if (!password.match(/([!, %, &, @, #, $, ^, *, ?, _, ~])/))
      throw new AppError("Password must have at least one special character");

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
