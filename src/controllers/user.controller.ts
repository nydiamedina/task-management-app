import { Request, Response } from "express";
import { container } from "../container";

export class UserController {
  async getUsers(req: Request, res: Response) {
    const userService = container.getService("userService");
    const users = await userService.findAll();
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const userService = container.getService("userService");
      const user = await userService.findOneById(parseInt(userId));
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }

  async createUser(req: Request, res: Response) {
    const { emailAddress, password, firstName, lastName } = req.body;
    try {
      const userService = container.getService("userService");
      const user = await userService.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { password, firstName, lastName } = req.body;
    try {
      const userService = container.getService("userService");
      const user = await userService.update(parseInt(userId), {
        password,
        firstName,
        lastName,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const userService = container.getService("userService");
      await userService.delete(parseInt(userId));
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }
}
