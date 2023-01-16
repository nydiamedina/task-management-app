import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Task } from "./task.model";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId!: number;

  @Column({ name: "email_address" })
  emailAddress!: string;

  @Column()
  password!: string;

  @Column({ name: "first_name" })
  firstName!: string;

  @Column({ name: "last_name" })
  lastName!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany((type) => Task, (task) => task.user)
  tasks!: Task[];
}
