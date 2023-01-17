import { Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { container } from "../container";
import { TaskBusinessModel } from "../business-models/task.business.model";

export class TaskController {
  async getTasks(req: Request, res: Response): Promise<void> {
    AuthMiddleware(req, res, () => {
      const { userId } = req.body;
      const taskService = container.getService("taskService");
      taskService
        .findAll(userId)
        .then((tasks: TaskBusinessModel[]) => res.status(200).json(tasks))
        .catch((err: Error) =>
          res.status(500).json({ message: `An error occurred. ${err}` })
        );
    });
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
    const { userId } = req.query;
    try {
      const taskService = container.getService("taskService");
      const task = await taskService.create(
        {
          title,
          description,
          taskStatus,
        },
        userId
      );
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }

  async updateTask(req: Request, res: Response) {
    const { taskId } = req.params;
    const { title, description, taskStatus } = req.body;
    const { userId } = req.query;
    try {
      const taskService = container.getService("taskService");
      const task = await taskService.update(
        parseInt(taskId),
        {
          title,
          description,
          taskStatus,
        },
        userId
      );
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
