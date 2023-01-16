import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";

export class Container {
  private services: any = {};

  constructor() {
    this.services.userService = new UserService(new UserRepository());
  }

  getService(name: string): any {
    return this.services[name];
  }
}
