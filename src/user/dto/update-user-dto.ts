import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  bio!: string | null;

  @IsOptional()
  @IsDateString()
  dob!: Date | null;

  @IsOptional()
  @IsString()
  profileImage!: string | null;

}
