import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOneById(userId: number): Promise<User | null> {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new Error(`User with user ID ${userId} was not found.`);
    }
    return user;
  }

  async create(user: Partial<User>): Promise<User> {
    if (!user.emailAddress || !user.password) {
      throw new Error("User's email address or password was not provided.");
    }

    const existingUser = await this.userRepository.findOneByEmailAddress(
      user.emailAddress
    );

    if (existingUser) {
      throw new Error("User with provided email address already exists.");
    }
    return await this.userRepository.create(user);
  }

  async update(userId: number, user: Partial<User>): Promise<User> {
    const userToUpdate = await this.userRepository.findOneById(userId);
    if (!userToUpdate) {
      throw new Error(`User with user ID ${userId} was not found.`);
    }
    return await this.userRepository.create({ ...userToUpdate, ...user });
  }

  async delete(userId: number): Promise<void> {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new Error(`User with user ID ${userId} was not found.`);
    }
    await this.userRepository.delete(userId);
  }
}
