import { Repository } from "typeorm";
import { AppDataSource } from "../config/database-connection";
import { Task } from "../models/task.model";

export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async findAll(userId: number): Promise<Task[]> {
    return await this.repository.find({
      where: { user: { userId } },
      relations: ["user", "taskStatus"],
    });
  }

  async findOneById(taskId: number): Promise<Task | null> {
    return await this.repository.findOne({
      where: { taskId },
      relations: ["user", "taskStatus"],
    });
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
