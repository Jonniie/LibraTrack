import React from 'react';
import { Book, ShoppingCart } from 'lucide-react';
import type { Book as BookType } from '../types';

interface BookCardProps {
  book: BookType;
  onAction: (action: 'borrow' | 'purchase', bookId: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAction }) => {
  const statusColor = {
    available: 'bg-green-100 text-green-800',
    borrowed: 'bg-yellow-100 text-yellow-800',
    reserved: 'bg-red-100 text-red-800',
  }[book.status];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
            {book.status}
          </span>
          <span className="font-semibold">${book.price}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onAction('borrow', book.id)}
            disabled={book.status !== 'available'}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Book className="w-4 h-4" />
            <span>Borrow</span>
          </button>
          <button
            onClick={() => onAction('purchase', book.id)}
            disabled={book.stockLevel === 0}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};