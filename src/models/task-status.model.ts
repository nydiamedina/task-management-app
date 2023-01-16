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

  @Column({ unique: true, nullable: false })
  name!: string;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date;
}
