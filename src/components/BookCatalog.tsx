import React from 'react';
import { BookCard } from './BookCard';
import type { Book } from '../types';

interface BookCatalogProps {
  books: Book[];
  onBookAction: (action: 'borrow' | 'purchase', bookId: string) => void;
}

export const BookCatalog: React.FC<BookCatalogProps> = ({ books, onBookAction }) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Book Catalog</h2>
        <p className="text-gray-600">Browse and manage your library inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onAction={onBookAction}
          />
        ))}
      </div>
    </>
  );
};