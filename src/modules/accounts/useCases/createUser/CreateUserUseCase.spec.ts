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
      username: "brunood",
      password: "123",
      email: "brunood07@gmail.com",
    });

    expect(newUser).toHaveProperty("username");
  });

  it("Should not be able to create a new user if the email is already registered", async () => {
    await createUserUseCase.execute({
      username: "brunood",
      password: "123",
      email: "brunood07@gmail.com",
    });

    await expect(
      createUserUseCase.execute({
        username: "brunood",
        password: "123",
        email: "brunood07@gmail.com",
      })
    ).rejects.toEqual(new AppError("User already exists!"));
  });
});
