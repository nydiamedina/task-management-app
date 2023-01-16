import { Repository } from "typeorm";
import { AppDataSource } from "../config/database-connection";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async findAll(user: User): Promise<Task[]> {
    return await this.repository.findBy({ user });
  }

  async findOneById(taskId: number): Promise<Task | null> {
    return await this.repository.findOneBy({ taskId });
  }

  async create(task: Partial<Task>): Promise<Task> {
    return await this.repository.save(task);
  }

  async update(taskId: number, task: Partial<Task>): Promise<void> {
    await this.repository.update(taskId, task);
  }

  async delete(taskId: number): Promise<void> {
    await this.repository.delete(taskId);
  }
}
