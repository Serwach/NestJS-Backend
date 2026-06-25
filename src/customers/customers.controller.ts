import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  findAll() {
    return this.customersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a customer' })
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateCustomerDto>) {
    return this.customersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a customer' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
