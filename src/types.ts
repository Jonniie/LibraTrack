export interface BookType {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  price: number;
  stockLevel: number;
  status: "available" | "borrowed" | "reserved" | "favorites";
  coverUrl: string;
  description: string;
  borrowCount?: number;
  lastBorrowed?: string;
  isFavorite?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "suspended";
  joinedAt: string;
  lastActive: string;
  borrowedBooks: string[];
  totalSpent: number;
  borrowHistory: {
    bookId: string;
    borrowDate: string;
    returnDate?: string;
  }[];
  purchaseHistory: {
    bookId: string;
    purchaseDate: string;
    amount: number;
  }[];
}

export interface DashboardStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalUsers: number;
  recentTransactions: Transaction[];
  favoritesCount: number;
}

export interface Transaction {
  id: string;
  userId: string;
  bookId: string;
  type: "borrow" | "return" | "purchase";
  date: string;
  amount?: number;
}
