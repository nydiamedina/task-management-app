import { Request, Response } from "express";
import { Container } from "../container";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor(container: Container) {
    this.userService = container.getService("userService");
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const user = await this.userService.findOneById(parseInt(userId));
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. Error: ${err}` });
    }
  }

  async getUserByEmailAddress(req: Request, res: Response) {
    const { emailAddress } = req.params;
    try {
      const user = await this.userService.findOneByEmailAddress(emailAddress);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. Error: ${err}` });
    }
  }

  async createUser(req: Request, res: Response) {
    const { emailAddress, password, firstName, lastName } = req.body;
    try {
      const user = await this.userService.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. Error: ${err}` });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { emailAddress, password, firstName, lastName } = req.body;
    try {
      const user = await this.userService.update(parseInt(userId), {
        emailAddress,
        password,
        firstName,
        lastName,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: `Invalid request. Error: ${err}` });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      await this.userService.delete(parseInt(userId));
      res.status(200).send();
    } catch (err) {
      res.status(400).json({ message: `Invalid request. Error: ${err}` });
    }
  }
}
