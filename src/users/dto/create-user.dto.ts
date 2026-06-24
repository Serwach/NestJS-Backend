import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Jan Kowalski' })
  name: string;

  @ApiProperty({ example: 'jan@example.com' })
  email: string;
}
