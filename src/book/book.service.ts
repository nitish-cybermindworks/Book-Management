import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor() {}
  async createBook(createBookDto: CreateBookDto) {
    
  }
}
