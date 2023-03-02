// src/tracking-plan/entities/tracking-plan.entity.ts

import { EventEntity } from 'src/models/Events/entities/Event.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TrackingPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  display_name: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @ManyToMany(() => EventEntity)
  @JoinTable()
  events: EventEntity[];
}
