export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  price: number;
  stockLevel: number;
  status: 'available' | 'borrowed' | 'reserved';
  coverUrl: string;
  description: string;
  borrowCount?: number;
  lastBorrowed?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'customer';
  status: 'active' | 'suspended' | 'deactivated';
  joinedAt: string;
  lastActive: string;
  borrowedBooks: string[];
  fines: number;
  recentBorrows?: {
    bookId: string;
    bookTitle: string;
    dueDate: string;
    status: 'returned' | 'due' | 'overdue';
  }[];
}

export interface Transaction {
  id: string;
  bookId: string;
  userId: string;
  type: 'purchase' | 'borrow' | 'return';
  date: string;
  dueDate?: string;
  status: 'active' | 'completed' | 'overdue';
  amount?: number;
  paymentStatus?: 'paid' | 'pending' | 'refunded';
}

export interface DashboardStats {
  totalBooks: number;
  activeUsers: number;
  currentLoans: number;
  totalTransactions: number;
  recentTransactions: Transaction[];
  popularBooks: Book[];
  activeLoans: {
    user: User;
    book: Book;
    dueDate: string;
  }[];
}