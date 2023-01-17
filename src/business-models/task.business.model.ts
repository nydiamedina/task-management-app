import { Task } from "../models/task.model";

export class TaskBusinessModel {
  taskId: number;
  title: string;
  description: string;
  taskStatus: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(task: Task) {
    this.taskId = task.taskId;
    this.title = task.title;
    this.description = task.description;
    this.taskStatus = task.taskStatus.name;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}
