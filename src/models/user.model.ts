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

  @Column({ name: "email_address", unique: true, nullable: false })
  emailAddress!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ name: "first_name" })
  firstName!: string;

  @Column({ name: "last_name" })
  lastName!: string;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
