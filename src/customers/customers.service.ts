import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const { password, ...rest } = dto;
    const customer = this.customersRepository.create(rest);
    if (password) {
      customer.password = await bcrypt.hash(password, 10);
    }
    return this.customersRepository.save(customer);
  }

  async register(dto: CreateCustomerDto): Promise<Omit<Customer, 'password'>> {
    const existing = await this.customersRepository.findOneBy({ email: dto.email });
    if (existing) throw new ConflictException('Email already in use');
    const { password, ...rest } = dto;
    const customer = this.customersRepository.create(rest);
    if (password) {
      customer.password = await bcrypt.hash(password, 10);
    }
    const saved = await this.customersRepository.save(customer);
    const { password: _pw, ...result } = saved as any;
    return result;
  }

  async login(email: string, password: string): Promise<Omit<Customer, 'password'>> {
    const customer = await this.customersRepository
      .createQueryBuilder('customer')
      .addSelect('customer.password')
      .where('customer.email = :email', { email })
      .getOne();
    if (!customer) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, customer.password ?? '');
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const { password: _pw, ...result } = customer as any;
    return result;
  }

  async update(id: number, dto: Partial<CreateCustomerDto>): Promise<Customer> {
    await this.customersRepository.update(id, dto);
    return this.customersRepository.findOneByOrFail({ id });
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
