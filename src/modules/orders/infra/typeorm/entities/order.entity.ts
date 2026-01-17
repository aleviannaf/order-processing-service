import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OrderStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

type OrderItem = {
  sku: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
};

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED })
  status!: OrderStatus;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  items!: OrderItem[];

  @Column({ type: 'int' })
  totalCents!: number;

  @Column({ type: 'varchar', nullable: true })
  checkoutSessionId!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

//Por quê jsonb pros itens? Escopo inicial simples. Depois normalizar