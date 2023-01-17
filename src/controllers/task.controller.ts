import { Request, Response } from "express";
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

  async getTaskById(req: Request, res: Response): Promise<void> {
    AuthMiddleware(req, res, () => {
      const { taskId } = req.params;
      const { userId } = req.body;
      const taskService = container.getService("taskService");
      taskService
        .findOneById(parseInt(taskId), parseInt(userId))
        .then((task: TaskBusinessModel) => res.status(200).json(task))
        .catch((err: Error) =>
          res.status(400).json({ message: `Invalid request. ${err}` })
        );
    });
  }

  async createTask(req: Request, res: Response): Promise<void> {
    AuthMiddleware(req, res, () => {
      const { title, description, taskStatus } = req.body;
      const { userId } = req.body;
      const taskService = container.getService("taskService");
      taskService
        .create(
          {
            title,
            description,
            taskStatus,
          },
          userId
        )
        .then((task: TaskBusinessModel) => res.status(201).json(task))
        .catch((err: Error) =>
          res.status(400).json({ message: `Invalid request. ${err}` })
        );
    });
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    AuthMiddleware(req, res, () => {
      const { taskId } = req.params;
      const { title, description, taskStatus } = req.body;
      const { userId } = req.body;
      const taskService = container.getService("taskService");
      taskService
        .update(
          parseInt(taskId),
          {
            title,
            description,
            taskStatus,
          },
          parseInt(userId)
        )
        .then((task: TaskBusinessModel) => res.status(200).json(task))
        .catch((err: Error) =>
          res.status(400).json({ message: `Invalid request. ${err}` })
        );
    });
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    AuthMiddleware(req, res, () => {
      const { taskId } = req.params;
      const { userId } = req.body;
      const taskService = container.getService("taskService");
      taskService
        .delete(parseInt(taskId), parseInt(userId))
        .then(() => res.status(204).send())
        .catch((err: Error) =>
          res.status(400).json({ message: `Invalid request. ${err}` })
        );
    });
  }
}
