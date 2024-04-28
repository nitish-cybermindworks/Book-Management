import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { AdminOnlyAuth, Auth } from 'src/common/decorators/user.decorator';
import { CreateBookDto, FilterBookDto, UpdateBookDto } from './dto/book.dto';
import { SuccessRO } from 'src/common/success.ro';
import { BookRO } from './book.ro';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse({ type: SuccessRO })
  @Auth()
  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @ApiOkResponse({ type: BookRO })
  @Auth()
  @Get()
  getBooks(@Query() filterBookDto: FilterBookDto) {
    return this.bookService.getBooks(filterBookDto);
  }

  @ApiOkResponse({ type: SuccessRO })
  @AdminOnlyAuth()
  @Put('update')
  updateBook(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBookDetails(updateBookDto);
  }

  @ApiOkResponse({ type: SuccessRO })
  @AdminOnlyAuth()
  @Delete('/:bookId')
  deleteBook(@Param('bookId') bookId: number) {
    return this.bookService.deleteBook(bookId);
  }
}
