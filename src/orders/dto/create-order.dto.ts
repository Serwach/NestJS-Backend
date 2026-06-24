import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ type: [CreateOrderItemDto] })
  items: CreateOrderItemDto[];
}
