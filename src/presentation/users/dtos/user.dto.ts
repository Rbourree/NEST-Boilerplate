import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDate, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsUUID()
  id_user: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  firstname?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  lastname?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  address?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  city?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  state?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  country?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  zipCode?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  phone?: string | null;
}
