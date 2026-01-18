import { OrderEntity } from '../../infra/typeorm/entities/order.entity';
import { OrderStatus } from '../../infra/typeorm/entities/order.entity';

export interface OrdersRepository {
  create(
    data: Pick<
      OrderEntity,
      'status' | 'items' | 'totalCents' | 'checkoutSessionId'
    >,
  ): Promise<OrderEntity>;

  findById(id: string): Promise<OrderEntity | null>;

  findMany(params: {
    status?: OrderStatus;
    page: number;
    limit: number;
  }): Promise<{
    data: OrderEntity[];
    total: number;
  }>;
}
