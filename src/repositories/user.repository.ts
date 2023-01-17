import { Repository } from "typeorm";
import { AppDataSource } from "../config/database-connection.config";
import { User } from "../models/user.model";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOneById(userId: number): Promise<User | null> {
    return await this.repository.findOneBy({ userId });
  }

  async findOneByEmailAddress(emailAddress: string): Promise<User | null> {
    return await this.repository.findOneBy({ emailAddress });
  }

  async create(user: Partial<User>): Promise<User> {
    return await this.repository.save(user);
  }

  async update(userId: number, user: Partial<User>): Promise<void> {
    await this.repository.update(userId, user);
  }

  async delete(userId: number): Promise<void> {
    await this.repository.delete(userId);
  }
}
