import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { BooksService } from './src/books/books.service';
import { ReviewsService } from './src/reviews/reviews.service';
import * as fs from 'fs';
import * as path from 'path';

interface BookData {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  status: string;
  copies: number;
  isbn: string;
  publisher: string;
  year: number;
  pages: number;
  description: string;
  cover: string;
  featured?: boolean;
}

interface ReviewData {
  user: string;
  rating: number;
  comment: string;
}

interface ReviewGroup {
  bookId: number;
  reviews: ReviewData[];
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const booksService = app.get(BooksService);
  const reviewsService = app.get(ReviewsService);

  const booksPath = path.join(__dirname, '../src/data/books.json');
  const reviewsPath = path.join(__dirname, '../src/data/reviews.json');

  const booksData = JSON.parse(
    fs.readFileSync(booksPath, 'utf8'),
  ) as BookData[];
  const reviewsData = JSON.parse(
    fs.readFileSync(reviewsPath, 'utf8'),
  ) as ReviewGroup[];

  console.log('Seeding books...');
  const bookMap = new Map<number, number>();

  for (const book of booksData) {
    // Exclude ID to let DB generate it, but keep track of old ID for reviews

    const { id, ...bookDetails } = book;
    const createdBook = await booksService.create(bookDetails);
    bookMap.set(id, createdBook.id);
    console.log(`Created book: ${createdBook.title} (ID: ${createdBook.id})`);
  }

  console.log('Seeding reviews...');
  for (const item of reviewsData) {
    const newBookId = bookMap.get(item.bookId);
    if (!newBookId) {
      console.warn(`Book ID ${item.bookId} not found for reviews.`);
      continue;
    }

    for (const review of item.reviews) {
      await reviewsService.create({
        ...review,
        bookId: newBookId,
      });
      console.log(`Created review for book ID ${newBookId}`);
    }
  }

  console.log('Seeding complete!');
  await app.close();
}

bootstrap().catch((err) => console.error(err));
