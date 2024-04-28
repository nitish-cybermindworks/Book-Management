import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'src/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from './category.entity';

@Unique({ name: 'unique_title_author_index', properties: ['title', 'author'] })
@Entity()
export class Book extends BaseEntity {
  @Property()
  title: string;

  @ManyToOne({ entity: () => User })
  author: User;

  @Unique()
  @Property({ nullable: true })
  isbn: number | null;

  @Property({ nullable: true })
  publicationYear: string | null;

  @ManyToOne({ entity: () => Category, nullable: true })
  category: Category | null;

  constructor({
    title,
    author,
    isbn,
    category,
    publicationYear,
  }: {
    title: string;
    author: User;
    isbn: number | null;
    category: Category | null;
    publicationYear: string | null;
  }) {
    super();
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.category = category;
    this.publicationYear = publicationYear;
  }
}
