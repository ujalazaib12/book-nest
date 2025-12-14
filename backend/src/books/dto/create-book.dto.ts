export class CreateBookDto {
  title: string;
  author: string;
  category: string;
  rating?: number;
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
