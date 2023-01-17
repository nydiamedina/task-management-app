import { Request, Response } from "express";
import { container } from "../container";

export class AuthController {
  async signup(req: Request, res: Response): Promise<void> {
    const { emailAddress, password, firstName, lastName } = req.body;

    try {
      const authService = container.getService("authService");
      await authService.signup(emailAddress, password, firstName, lastName);
      res.status(201).send("User has been created successfully.");
    } catch (err) {
      res.status(400).json({ message: `Invalid request. ${err}` });
    }
  }
  
  async login(req: Request, res: Response): Promise<void> {
    const { emailAddress, password } = req.body;

    try {
      const authService = container.getService("authService");
      const token = await authService.login(emailAddress, password);
      res.status(200).json({ token });
    } catch (err) {
      res.status(401).json({ message: `Invalid request. ${err}` });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    const token = req.headers["x-access-token"] as string;

    try {
      const authService = container.getService("authService");
      await authService.logout(token);
      res.status(204).send();
    } catch (err) {
      res.status(401).json({ message: `Invalid request. ${err}` });
    }
  }
}
