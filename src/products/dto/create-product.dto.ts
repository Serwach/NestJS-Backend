import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop Pro' })
  name: string;

  @ApiProperty({ example: 2999.99 })
  price: number;

  @ApiProperty({ example: 'High-performance laptop', required: false })
  description?: string;
}
