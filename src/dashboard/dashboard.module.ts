import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';
import { Customer } from '../customers/customer.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Customer, User])],
  controllers: [DashboardController],
})
export class DashboardModule {}
