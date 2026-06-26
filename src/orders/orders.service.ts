import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: { user: true, items: { product: true } },
    });
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create({
      ...(dto.userId ? { user: { id: dto.userId } } : {}),
      ...(dto.customerId ? { customer: { id: dto.customerId } } : {}),
    });
    order.items = dto.items.map((item) =>
      this.orderItemsRepository.create({
        product: { id: item.productId },
        quantity: item.quantity,
      }),
    );
    return this.ordersRepository.save(order);
  }
}
