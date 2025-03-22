import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Book as BookIcon, RotateCcw } from 'lucide-react';
import type { Book } from '../types';

interface BorrowedBooksProps {
  books: Book[];
  onReturn: (bookId: string) => void;
}

export const BorrowedBooks: React.FC<BorrowedBooksProps> = ({ books, onReturn }) => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Please sign in to view your borrowed books.</p>
      </div>
    );
  }

  const borrowedBooks = books.filter(book => book.status === 'borrowed');

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Borrowed Books</h2>
        <p className="text-gray-600">Manage your currently borrowed books</p>
      </div>

      {borrowedBooks.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <BookIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Books Borrowed</h3>
          <p className="text-gray-500">You haven't borrowed any books yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {borrowedBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4">by {book.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Due: {new Date(book.lastBorrowed!).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onReturn(book.id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Return</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};