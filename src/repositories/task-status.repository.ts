import { Repository } from "typeorm";
import { AppDataSource } from "../config/database-connection";
import { TaskStatus } from "../models/task-status.model";

export class TaskStatusRepository {
  private repository: Repository<TaskStatus>;

  constructor() {
    this.repository = AppDataSource.getRepository(TaskStatus);
  }

  async findAll(): Promise<TaskStatus[]> {
    return await this.repository.find();
  }

  async findOneById(taskStatusId: number): Promise<TaskStatus | null> {
    return await this.repository.findOneBy({ taskStatusId });
  }

  async findOneByName(name: string): Promise<TaskStatus | null> {
    return await this.repository.findOneBy({ name });
  }
}
