import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create a new user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const newUser = await usersRepositoryInMemory.create({
      firstName: "Bruno",
      lastName: "Domingues",
      document: "123456",
      phoneNumber: "99999999",
      dateOfBirth: "07/02/1991",
      password: "123",
      email: "brunood08@gmail.com",
    });

    expect(newUser).toHaveProperty("document");
  });

  it("Should not be able to create a new user if the email is already registered", async () => {
    await createUserUseCase.execute({
      firstName: "Bruno",
      lastName: "Domingues",
      document: "123456",
      phoneNumber: "99999999",
      dateOfBirth: "07/02/1991",
      password: "123",
      email: "brunood08@gmail.com",
    });

    await expect(
      createUserUseCase.execute({
        firstName: "Bruno",
        lastName: "Domingues",
        document: "123456",
        phoneNumber: "99999999",
        dateOfBirth: "07/02/1991",
        password: "123",
        email: "brunood08@gmail.com",
      })
    ).rejects.toEqual(new AppError("User already exists!"));
  });
});
