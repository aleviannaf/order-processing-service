import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from '../../../dtos/create-order.dto';
import { ListOrdersQueryDto } from '../../../dtos/list-orders-query.dto';
import { CreateOrderService } from '../../../services/create-order.service';
import { GetOrderService } from '../../../services/get-order.service';
import { ListOrdersService } from '../../../services/list-orders.service';
import { OrderEntity } from '../../typeorm/entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrder: CreateOrderService,
    private readonly getOrder: GetOrderService,
    private readonly listOrders: ListOrdersService,
  ) {}

  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<OrderEntity> {
    return this.createOrder.execute(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<OrderEntity> {
    return this.getOrder.execute(id);
  }

  @Get()
  async list(@Query() query: ListOrdersQueryDto) {
    return this.listOrders.execute(query);
  }
}
