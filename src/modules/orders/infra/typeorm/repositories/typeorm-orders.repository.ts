import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersRepository } from '../../../domain/repositories/orders-repository';
import { OrderEntity, OrderStatus } from '../entities/order.entity';

@Injectable()
export class TypeOrmOrdersRepository implements OrdersRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  async create(
    data: Pick<
      OrderEntity,
      'status' | 'items' | 'totalCents' | 'checkoutSessionId'
    >,
  ): Promise<OrderEntity> {
    const order = this.repo.create(data);
    return this.repo.save(order);
  }

  async findById(id: string): Promise<OrderEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findMany(params: {
    status?: OrderStatus;
    page: number;
    limit: number;
  }): Promise<{ data: OrderEntity[]; total: number }> {
    const { status, page, limit } = params;

    const qb = this.repo.createQueryBuilder('order');

    if (status) {
      qb.where('order.status = :status', { status });
    }

    qb.orderBy('order.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    return { data, total };
  }
}
