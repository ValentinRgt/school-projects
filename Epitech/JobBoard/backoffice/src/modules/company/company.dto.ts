import { IsOptional, IsUUID, IsString, IsFQDN } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class CompanyDTO {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  slug: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  siret: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  website: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ type: User, isArray: true })
  users: User[];
}

export class createCompanyDTO {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  siret: string;

  @ApiProperty({ type: String })
  @IsFQDN()
  @IsString()
  website: string;

  @ApiProperty({ type: String })
  @IsString()
  address: string;
}
