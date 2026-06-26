import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1, required: false })
  userId?: number;

  @ApiProperty({ example: 1, required: false })
  customerId?: number;

  @ApiProperty({ type: [CreateOrderItemDto] })
  items: CreateOrderItemDto[];
}
