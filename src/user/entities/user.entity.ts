import {
  Property,
  Entity,
  Unique,
  Enum,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { Book } from 'src/book/entities/book.entity';

export enum UserRole {
  normalUser = 'normalUser',
  admin = 'admin',
}

@Entity()
export class User extends BaseEntity {
  @Property()
  firstName: string;

  @Property({ nullable: true })
  lastName: string | null;

  @Property()
  @Unique()
  email: string;

  @Property()
  @Unique()
  phone: string;

  @Enum({ items: () => UserRole })
  role: UserRole;

  @Property({ type: 'text', nullable: true })
  bio: string | null;

  @Property({ type: 'text', nullable: true })
  profileImage: string | null;

  @OneToMany({ entity: () => Book, mappedBy: 'author', nullable: true })
  books = new Collection<Book>(this);

  constructor({
    firstName,
    lastName,
    email,
    phone,
    role,
    bio,
    profileImage,
  }: {
    firstName: string;
    lastName: string | null;
    email: string;
    phone: string;
    role: UserRole;
    bio: string | null;
    profileImage: string | null;
  }) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.bio = bio;
    this.profileImage = profileImage;
  }

  @Property({ persist: false })
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
