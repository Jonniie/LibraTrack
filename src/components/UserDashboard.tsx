import { useUser } from "@clerk/clerk-react";
import { Book, ShoppingBag, Heart, Clock } from "lucide-react";
import { type BookType } from "../types";
// import useStore from "../store/useStore";
// import { type DashboardStats } from "../types";
export const UserDashboard = ({
  username,
  books,
}: {
  username: string | undefined;
  books: BookType[];
}) => {
  const { user } = useUser();
  // const { books, transactions, getUserStats, favorites } = useStore();
  if (!user) return null;

  // Replace the existing stats declaration with this
  const userStats = {
    borrowedCount: 0,
    returnedCount: 0,
    totalSpent: 0,
    favorites: [],
  };

  // Calculate borrowed books once to avoid duplication
  const borrowedBooks = books.filter((b) => b.status === "borrowed");
  const recentTransactions: [] = [];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {username}!
        </h2>
        <p className="text-gray-600">
          Here's an overview of your library activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold">
              {userStats.borrowedCount}
            </span>
          </div>
          <h3 className="text-gray-600">Books Borrowed</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold">
              ${userStats.totalSpent.toFixed(2)}
            </span>
          </div>
          <h3 className="text-gray-600">Total Spent</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-red-600" />
            <span className="text-3xl font-bold">
              {userStats.favorites.length}
            </span>
          </div>
          <h3 className="text-gray-600">Favorites</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-purple-600" />
            <span className="text-3xl font-bold">{borrowedBooks.length}</span>
          </div>
          <h3 className="text-gray-600">Currently Borrowed</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            {recentTransactions.length === 0 ? (
              <p className="text-gray-500">No recent activity</p>
            ) : (
              <div className="space-y-4">
                {/* {recentTransactions.map((transaction) => {
                  const book = books.find((b) => b.id === transaction?.bookId);
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{book?.title}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })} */}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Currently Borrowed
            </h3>
          </div>
          <div className="p-6">
            {borrowedBooks.length === 0 ? (
              <p className="text-gray-500">No books currently borrowed</p>
            ) : (
              <div className="space-y-4">
                {borrowedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-gray-500">
                        Due: {new Date(book.lastBorrowed!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
