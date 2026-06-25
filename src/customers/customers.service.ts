import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  create(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(dto);
    return this.customersRepository.save(customer);
  }

  async update(id: number, dto: Partial<CreateCustomerDto>): Promise<Customer> {
    await this.customersRepository.update(id, dto);
    return this.customersRepository.findOneByOrFail({ id });
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
