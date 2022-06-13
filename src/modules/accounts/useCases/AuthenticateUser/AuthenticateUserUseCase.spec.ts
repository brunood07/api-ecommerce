import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/providers/DateProvider/Implementations/DayjsDateProvider";

import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to authenticate a user", async () => {
    const user = await usersRepository.create({
      firstName: "Bruno",
      lastName: "Domingues",
      document: "123456",
      phoneNumber: "99999999",
      dateOfBirth: "07/02/1991",
      password: "Bruno123*",
      email: "brunood08@gmail.com",
    });

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate with an incorrect email", () => {
    expect(async () => {
      const user = await usersRepository.create({
        firstName: "Bruno",
        lastName: "Domingues",
        document: "123456",
        phoneNumber: "99999999",
        dateOfBirth: "07/02/1991",
        password: "Bruno123*",
        email: "brunood08@gmail.com",
      });

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "wrong@email.com",
        password: user.password,
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("Should not be able to authenticate with an incorrect password", () => {
    expect(async () => {
      const user = await usersRepository.create({
        firstName: "Bruno",
        lastName: "Domingues",
        document: "123456",
        phoneNumber: "99999999",
        dateOfBirth: "07/02/1991",
        password: "Bruno123*",
        email: "brunood08@gmail.com",
      });

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongpassword",
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
