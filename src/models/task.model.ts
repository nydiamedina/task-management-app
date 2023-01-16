import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { TaskStatus } from "./task-status.model";
import { User } from "./user.model";

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn({ name: "task_id" })
  taskId!: number;

  @ManyToOne((type) => User, (user) => user.tasks)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @OneToOne((type) => TaskStatus)
  @JoinColumn({ name: "task_status_id" })
  taskStatusId!: TaskStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
