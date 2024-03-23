import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsUUID,
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';
import { IsEqualTo } from '../../validator/isEqualTo.decorator';
import { Transform } from 'class-transformer';

export class UserDTO {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  lastname: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ type: String })
  @MinLength(8)
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  curriculumVitae: string;

  @ApiProperty({ type: Boolean })
  @IsString()
  @IsOptional()
  isPublic: boolean;

  @ApiProperty({ type: Boolean })
  @IsString()
  @IsOptional()
  isAdmin: boolean;
}

export class UpdateUserInformationDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) {
      return null;
    }
    return value;
  })
  phone?: string;
}

export class UpdateUserPasswordDTO {
  @ApiProperty({ type: String })
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty({ type: String })
  @IsEqualTo('password')
  @IsString()
  passwordConfirm: string;
}

export class UpdateUserProfileDTO {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'false') {
      return false;
    }
    if (value === 'true') {
      return true;
    }
    return value;
  })
  isPublic: boolean;

  @ApiProperty({ type: String })
  @IsString()
  description: string;
}
