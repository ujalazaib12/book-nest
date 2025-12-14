import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from '../reviews/review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column('float', { default: 0 })
  rating: number;

  @Column({ default: 'Available' })
  status: string;

  @Column('int', { default: 0 })
  copies: number;

  @Column()
  isbn: string;

  @Column()
  publisher: string;

  @Column('int')
  year: number;

  @Column('int')
  pages: number;

  @Column('text')
  description: string;

  @Column()
  cover: string;

  @Column({ default: false })
  featured: boolean;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
