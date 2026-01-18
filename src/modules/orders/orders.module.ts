import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './infra/typeorm/entities/order.entity';
import { OrdersController } from './infra/http/controllers/orders.controller';
import { CreateOrderService } from './services/create-order.service';
import { GetOrderService } from './services/get-order.service';
import { TypeOrmOrdersRepository } from './infra/typeorm/repositories/typeorm-orders.repository';
import { ORDERS_REPOSITORY } from './domain/repositories/orders-repository.token';
import { ListOrdersService } from './services/list-orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController],
  providers: [
    CreateOrderService,
    GetOrderService,
    TypeOrmOrdersRepository,
    ListOrdersService,
    { provide: ORDERS_REPOSITORY, useExisting: TypeOrmOrdersRepository },
  ],
})
export class OrdersModule {}
