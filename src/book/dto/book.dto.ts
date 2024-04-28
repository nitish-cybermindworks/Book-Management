import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title!: string;

  @IsNumber()
  authorId!: number;

  @IsOptional()
  @IsNumber()
  isbn!: number;

  @IsOptional()
  @IsNumber()
  categoryId!: number;

  @IsOptional()
  @IsString()
  publicationYear!: string;
}

export class FilterBookDto {
  @IsOptional()
  @IsString()
  title!: string;

  @IsOptional()
  @IsNumber()
  authorId!: number;

  @IsOptional()
  @IsNumber()
  isbn!: number;

  @IsOptional()
  @IsNumber()
  categoryId!: number;

  @IsOptional()
  @IsString()
  publicationYear!: string;
}

export class UpdateBookDto extends CreateBookDto {
  @IsNumber()
  id!: number;
}
