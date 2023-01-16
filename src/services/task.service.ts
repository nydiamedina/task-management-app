import { TaskRepository } from "../repositories/task.repository";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async findAll(user: User): Promise<Task[]> {
    return await this.taskRepository.findAll(user);
  }

  async findOneById(taskId: number): Promise<Task | null> {
    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new Error("Task with the provided task id was not found.");
    }
    return task;
  }

  async create(task: Partial<Task>): Promise<Task> {
    if (!task.title || !task.taskStatus) {
      throw new Error("Task's title or status was not provided.");
    }

    return await this.taskRepository.create(task);
  }

  async update(taskId: number, task: Partial<Task>): Promise<Task> {
    const taskToUpdate = await this.taskRepository.findOneById(taskId);
    if (!taskToUpdate) {
      throw new Error("Task not found.");
    }
    return await this.taskRepository.create({ ...taskToUpdate, ...task });
  }

  async delete(taskId: number): Promise<void> {
    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new Error("User with the provided user id was not found.");
    }
    await this.taskRepository.delete(taskId);
  }
}
