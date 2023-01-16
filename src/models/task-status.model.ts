import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("task_status")
export class TaskStatus {
  @PrimaryGeneratedColumn({ name: "task_status_id" })
  taskStatusId!: number;

  @Column()
  name!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
