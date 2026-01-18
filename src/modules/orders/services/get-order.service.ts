import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY } from '../domain/repositories/orders-repository.token';
import type { OrdersRepository } from '../domain/repositories/orders-repository';
import type { OrderEntity } from '../infra/typeorm/entities/order.entity';
import { AppError } from 'src/shared/errors/app-error';

@Injectable()
export class GetOrderService {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly ordersRepo: OrdersRepository,
  ) {}

  async execute(id: string): Promise<OrderEntity> {
    const order = await this.ordersRepo.findById(id);

    if (!order) {
      throw new AppError('ORDER_NOT_FOUND', 404, 'Order not found');
    }

    return order;
  }
}
