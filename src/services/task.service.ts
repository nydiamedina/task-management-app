import { TaskRepository } from "../repositories/task.repository";
import { TaskStatusRepository } from "../repositories/task-status.repository";
import { UserRepository } from "../repositories/user.repository";
import { TaskBusinessModel } from "../business-models/task.business.model";

export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private taskStatusRepository: TaskStatusRepository,
    private userRepository: UserRepository
  ) {}

  async findAll(userId: number): Promise<TaskBusinessModel[]> {
    const tasks = await this.taskRepository.findAll(userId);
    return tasks.map((task) => new TaskBusinessModel(task));
  }

  async findOneById(taskId: number): Promise<TaskBusinessModel | null> {
    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new Error("Task with the provided task id was not found.");
    }
    return new TaskBusinessModel(task);
  }

  async create(
    task: Partial<TaskBusinessModel>,
    userId: number
  ): Promise<TaskBusinessModel> {
    if (!task.title || !task.taskStatus) {
      throw new Error("Task's title or status was not provided.");
    }

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new Error("User provided is invalid.");
    }

    const taskStatus = await this.taskStatusRepository.findOneByName(
      task.taskStatus
    );
    if (!taskStatus) {
      throw new Error(
        "Task's status provided isn't one of the expected status."
      );
    }

    const createdTask = await this.taskRepository.create({
      ...task,
      user,
      taskStatus,
    });
    return new TaskBusinessModel(createdTask);
  }

  async update(
    taskId: number,
    task: Partial<TaskBusinessModel>,
    userId: number
  ): Promise<TaskBusinessModel> {
    let taskToUpdate = await this.taskRepository.findOneById(taskId);
    if (!taskToUpdate) {
      throw new Error("Task not found.");
    }

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new Error("User provided is invalid.");
    }

    if(task.title) {
      taskToUpdate.title = task.title
    }

    if(task.description) {
      taskToUpdate.description = task.description
    }

    if (task.taskStatus) {
      const taskStatus = await this.taskStatusRepository.findOneByName(
        task.taskStatus
      );

      if (!taskStatus) {
        throw new Error(
          "Task's status provided isn't one of the expected status."
        );
      }

      taskToUpdate.taskStatus = taskStatus;
    }

    await this.taskRepository.update(taskId, taskToUpdate);
    return new TaskBusinessModel(taskToUpdate);
  }

  async delete(taskId: number): Promise<void> {
    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new Error("Task with the provided task id was not found.");
    }
    await this.taskRepository.delete(taskId);
  }
}
