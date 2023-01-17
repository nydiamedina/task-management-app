import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TaskStatus } from "./task-status.model";
import { User } from "./user.model";

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn({ name: "task_id" })
  taskId!: number;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ nullable: false })
  title!: string;

  @Column()
  description!: string;

  @ManyToOne(() => TaskStatus)
  @JoinColumn({ name: "task_status_id" })
  taskStatus!: TaskStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
