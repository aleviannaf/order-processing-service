import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum OrderStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED })
  status!: OrderStatus;

  // Normalizar posteriormente se quiser.
  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  items!: Array<{ sku: string; name: string; quantity: number; unitPrice: number }>;

  @Column({ type: 'int' })
  totalCents!: number;

  @Column({ type: 'varchar', nullable: true })
  checkoutSessionId!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
