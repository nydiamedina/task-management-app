import { Request, Response } from "express";
import { container } from "../container";

export class TaskController {
  async getTasks(req: Request, res: Response) {
    const taskService = container.getService("taskService");
    const tasks = await taskService.findAll();
    res.status(200).json(tasks);
  }

  async getTaskById(req: Request, res: Response) {
    const { taskId } = req.params;
    try {
      const taskService = container.getService("taskService");
      const task = await taskService.findOneById(parseInt(taskId));
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }

  async createTask(req: Request, res: Response) {
    const { title, description, taskStatus } = req.body;
    try {
      const taskService = container.getService("taskService");
      const task = await taskService.create({
        title,
        description,
        taskStatus,
      });
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }

  async updateTask(req: Request, res: Response) {
    const { taskId } = req.params;
    const { title, description, taskStatus } = req.body;
    try {
      const taskService = container.getService("taskService");
      const task = await taskService.update(parseInt(taskId), {
        title,
        description,
        taskStatus,
      });
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { taskId } = req.params;
    try {
      const taskService = container.getService("taskService");
      await taskService.delete(parseInt(taskId));
      res.status(200).send();
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }
}
