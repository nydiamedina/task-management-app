import { AuthService } from "./services/auth.service";
import { TaskRepository } from "./repositories/task.repository";
import { TaskService } from "./services/task.service";
import { TaskStatusRepository } from "./repositories/task-status.repository";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";

class Container {
  private services: any = {};

  constructor() {
    this.services.authService = new AuthService(new UserRepository());
    this.services.userService = new UserService(new UserRepository());
    this.services.taskService = new TaskService(
      new TaskRepository(),
      new TaskStatusRepository(),
      new UserRepository()
    );
  }

  getService(name: string): any {
    return this.services[name];
  }
}

export const container = new Container();
