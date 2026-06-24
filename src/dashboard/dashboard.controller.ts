import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';
import { Customer } from '../customers/customer.entity';
import { User } from '../users/user.entity';

@Controller('dashboard')
@UseGuards(AuthenticatedGuard)
export class DashboardController {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  @Get()
  @Render('dashboard')
  async index() {
    const [ordersCount, productsCount, customersCount, usersCount] =
      await Promise.all([
        this.ordersRepo.count(),
        this.productsRepo.count(),
        this.customersRepo.count(),
        this.usersRepo.count(),
      ]);
    return { title: 'Dashboard', activeDashboard: true, ordersCount, productsCount, customersCount, usersCount };
  }

  @Get('orders')
  @Render('orders')
  async orders() {
    const orders = await this.ordersRepo.find({
      relations: { customer: true, items: { product: true } },
    });
    return { title: 'Orders', activeOrders: true, orders };
  }

  @Get('products')
  @Render('products')
  async products() {
    const products = await this.productsRepo.find();
    return { title: 'Products', activeProducts: true, products };
  }

  @Get('customers')
  @Render('customers')
  async customers() {
    const customers = await this.customersRepo.find();
    return { title: 'Customers', activeCustomers: true, customers };
  }
}
