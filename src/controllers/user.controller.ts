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
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await this.userService.findOneById(parseInt(userId));
    res.json(user);
  }

  async getUserByEmailAddress(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await this.userService.findOneByEmailAddress(userId);
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    const { emailAddress, password, firstName, lastName } = req.body;
    const user = await this.userService.create({
      emailAddress,
      password,
      firstName,
      lastName,
    });
    res.json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { emailAddress, password, firstName, lastName } = req.body;
    const user = await this.userService.update(parseInt(userId), {
      emailAddress,
      password,
      firstName,
      lastName,
    });
    res.json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    await this.userService.delete(parseInt(userId));
    res.send();
  }
}
