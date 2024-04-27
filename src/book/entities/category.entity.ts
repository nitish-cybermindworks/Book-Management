import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from 'src/base.entity';
import { Book } from './book.entity';

@Entity()
export class Category extends BaseEntity {
  @Unique()
  @Property()
  name: string;

  @OneToMany({ entity: () => Book, mappedBy: 'category', nullable: true })
  books = new Collection<Book>(this);

  constructor({ name }: { name: string }) {
    super();
    this.name = name;
  }
}
