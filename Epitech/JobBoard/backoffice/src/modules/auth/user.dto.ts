import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { IsEqualTo } from '../../validator/isEqualTo.decorator';

export class LoginUserDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @MinLength(8)
  @IsString()
  password: string;
}

export class RegisterUserDTO {
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
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ type: String })
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty({ type: String })
  @IsEqualTo('password')
  @IsString()
  passwordConfirm: string;
}

export class ForgotUserDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;
}
