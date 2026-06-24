import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
