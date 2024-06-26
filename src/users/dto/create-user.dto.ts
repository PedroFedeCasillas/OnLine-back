import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageProfile?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imagePortada?: string;
}

