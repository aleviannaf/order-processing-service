import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './infra/typeorm/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
})
export class OrdersModule {}
