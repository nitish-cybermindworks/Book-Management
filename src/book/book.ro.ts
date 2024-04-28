import { UserRO } from 'src/user/user.ro';
import { Book } from './entities/book.entity';

export class BookRO {
  id: number;
  title: string;
  author: UserRO;
  isbn: number | null;
  category: String | null;
  publicationYear: string | null;

  constructor({ book }: { book: Book }) {
    this.id = book.id;
    this.title = book.title;
    this.author = new UserRO(book.author);
    this.isbn = book.isbn;
    this.category = book.category.name;
    this.publicationYear = book.publicationYear;
  }
}
