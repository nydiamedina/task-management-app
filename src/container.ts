import { TaskRepository } from "./repositories/task.repository";
import { TaskService } from "./services/task.service";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";

class Container {
  private services: any = {};

  constructor() {
    this.services.userService = new UserService(new UserRepository());
    this.services.taskService = new TaskService(new TaskRepository());
  }

  getService(name: string): any {
    return this.services[name];
  }
}

export const container = new Container();
