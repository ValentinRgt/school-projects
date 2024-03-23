import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createAdvertismentDTO {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  description: string;
}

export class ApplyAdvertismentDTO {
  @ApiProperty({ type: String })
  @IsString()
  firstname: string;

  @ApiProperty({ type: String })
  @IsString()
  lastname: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  message: string;
}
