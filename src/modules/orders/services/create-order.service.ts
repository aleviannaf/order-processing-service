import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY } from '../domain/repositories/orders-repository.token';
import type { OrdersRepository } from '../domain/repositories/orders-repository';
import {
  OrderStatus,
  type OrderEntity,
} from '../infra/typeorm/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class CreateOrderService {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly ordersRepo: OrdersRepository,
  ) {}

  async execute(dto: CreateOrderDto): Promise<OrderEntity> {
    const totalCents = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPriceCents,
      0,
    );

    return this.ordersRepo.create({
      status: OrderStatus.CREATED,
      items: dto.items,
      totalCents,
      checkoutSessionId: null,
    });
  }
}
