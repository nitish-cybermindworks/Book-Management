import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateBookDto, FilterBookDto, UpdateBookDto } from './dto/book.dto';
import { Book } from './entities/book.entity';
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/postgresql';
import { Category } from './entities/category.entity';
import { SuccessRO } from 'src/common/success.ro';
import { BookRO } from './book.ro';

@Injectable()
export class BookService {
  constructor(private em: EntityManager) {}

  async createBook(createBookDto: CreateBookDto) {
    const options: FilterQuery<Book> = {
      author: createBookDto.authorId,
      title: createBookDto.title,
    };

    if (createBookDto.isbn) {
      options['$or'] = [
        { author: createBookDto.authorId, title: createBookDto.title },
        { isbn: createBookDto.isbn },
      ];
    }

    const [book, author, category] = await Promise.all([
      this.em.findOne(Book, options),
      this.em.findOneOrFail(User, { id: createBookDto.authorId }),
      this.em.findOne(Category, { id: createBookDto.categoryId }),
    ]);

    if (book?.isbn === createBookDto.isbn) {
      throw new BadRequestException(`ISBN number ${book.isbn} already exists`);
    }

    if (book) {
      throw new BadRequestException(`Author and title already exists`);
    }

    const newBook = new Book({
      title: createBookDto.title,
      author,
      isbn: createBookDto.isbn,
      publicationYear: createBookDto.publicationYear,
      category,
    });

    this.em.persist(newBook);
    wrap(author).assign({ books: [...author.books, newBook] });

    await this.em.flush();

    return new SuccessRO();
  }

  async getBooks(dto: FilterBookDto) {
    const options: FilterQuery<Book> = {};

    if (dto.authorId) {
      options.author = dto.authorId;
    }

    if (dto.title) {
      options.title = dto.title;
    }
    if (dto.isbn) {
      options.isbn = dto.isbn;
    }
    if (dto.publicationYear) {
      options.publicationYear = dto.publicationYear;
    }
    if (dto.categoryId) {
      options.category = dto.categoryId;
    }

    const books = await this.em.find(Book, options, {
      populate: ['author', 'category'],
    });

    return books.map((book) => new BookRO({ book }));
  }

  async updateBookDetails(updateBookDto: UpdateBookDto) {
    const [book, author, category] = await Promise.all([
      this.em.findOneOrFail(Book, { id: updateBookDto.id }),
      this.em.findOneOrFail(User, { id: updateBookDto.authorId }),
      this.em.findOne(Category, { id: updateBookDto.categoryId }),
    ]);

    wrap(book).assign({
      title: updateBookDto.title,
      author,
      isbn: updateBookDto.isbn,
      publicationYear: updateBookDto.publicationYear,
      category,
    });

    return new SuccessRO();
  }

  async deleteBook(bookId: number) {
    const book = await this.em.findOneOrFail(Book, { id: bookId });
    await this.em.removeAndFlush(book);
    
    return new SuccessRO();
  }
}
