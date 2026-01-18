import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY } from '../domain/repositories/orders-repository.token';
import type { OrdersRepository } from '../domain/repositories/orders-repository';
import { ListOrdersQueryDto } from '../dtos/list-orders-query.dto';
import type { OrderEntity } from '../infra/typeorm/entities/order.entity';

@Injectable()
export class ListOrdersService {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly ordersRepo: OrdersRepository,
  ) {}

  async execute(query: ListOrdersQueryDto): Promise<{
    data: OrderEntity[];
    page: number;
    limit: number;
    total: number;
  }> {
    const { data, total } = await this.ordersRepo.findMany({
      status: query.status,
      page: query.page,
      limit: query.limit,
    });

    return {
      data,
      page: query.page,
      limit: query.limit,
      total,
    };
  }
}
