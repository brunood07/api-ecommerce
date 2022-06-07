import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<ICreateUserDTO>;
  findByEmail(email: string): Promise<ICreateUserDTO>;
}

export { IUsersRepository };
