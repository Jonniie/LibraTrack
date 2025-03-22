import { create } from "zustand";
import type { BookType, User, Transaction, DashboardStats } from "../types";

type UserStats = {
  borrowedCount: number;
  returnedCount: number;
  totalSpent: number;
};

interface Store {
  books: BookType[];
  users: User[];
  transactions: Transaction[];
  stats: DashboardStats;
  wishlist: string[];
  favorites: string[];

  updateStats(): void;
  borrowBook(bookId: string, userId: string): boolean;
  returnBook(bookId: string, userId: string): boolean;
  purchaseBook(bookId: string, userId: string): boolean;
  toggleWishlist(bookId: string): void;
  toggleFavorite(bookId: string): void;
  addBook(book: BookType): void;
  updateBook(book: BookType): boolean;
  deleteBook(bookId: string): void;
  getUserStats(userId: string): UserStats | null;
}

export const useStore = create<Store>((set, get) => ({
  books: [],
  users: [],
  transactions: [],
  stats: {
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalUsers: 0,
    recentTransactions: [],
    favoritesCount: 0,
    wishlistCount: 0,
  },
  wishlist: [],
  favorites: [],

  updateStats: () => {
    const { books, transactions, favorites } = get();
    set({
      stats: {
        totalBooks: books.length,
        availableBooks: books.filter((b) => b.status === "available").length,
        borrowedBooks: books.filter((b) => b.status === "borrowed").length,
        totalUsers: get().users.length,
        recentTransactions: [...transactions]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 5),
        favoritesCount: favorites.length,
      },
    });
  },

  borrowBook: (bookId, userId) => {
    const book = get().books.find((b) => b.id === bookId);
    const user = get().users.find((u) => u.id === userId);

    if (!book || !user || book.status !== "available") {
      return false;
    }

    set((state) => ({
      books: state.books.map((b) =>
        b.id === bookId
          ? { ...b, status: "borrowed", lastBorrowed: new Date().toISOString() }
          : b
      ),
      transactions: [
        ...state.transactions,
        {
          id: crypto.randomUUID(),
          userId,
          bookId,
          type: "borrow",
          date: new Date().toISOString(),
        },
      ],
    }));

    get().updateStats();
    return true;
  },

  returnBook: (bookId, userId) => {
    const book = get().books.find((b) => b.id === bookId);
    const user = get().users.find((u) => u.id === userId);

    if (!book || !user || book.status !== "borrowed") {
      return false;
    }

    set((state) => ({
      books: state.books.map((b) =>
        b.id === bookId
          ? {
              ...b,
              status: "available",
              borrowCount: (b.borrowCount || 0) + 1,
            }
          : b
      ),
      transactions: [
        ...state.transactions,
        {
          id: crypto.randomUUID(),
          userId,
          bookId,
          type: "return",
          date: new Date().toISOString(),
        },
      ],
    }));

    get().updateStats();
    return true;
  },

  toggleFavorite: (bookId) => {
    const book = get().books.find((b) => b.id === bookId);
    if (!book) return;

    set((state) => ({
      favorites: state.favorites.includes(bookId)
        ? state.favorites.filter((id) => id !== bookId)
        : [...state.favorites, bookId],
    }));

    get().updateStats();
  },

  toggleWishlist: (bookId) => {
    const book = get().books.find((b) => b.id === bookId);
    if (!book) return;

    set((state) => ({
      wishlist: state.wishlist.includes(bookId)
        ? state.wishlist.filter((id) => id !== bookId)
        : [...state.wishlist, bookId],
    }));

    get().updateStats();
  },

  getUserStats: (userId) => {
    const user = get().users.find((u) => u.id === userId);
    if (!user) return null;

    const userTransactions = get().transactions.filter(
      (t) => t.userId === userId
    );
    return {
      borrowedCount: userTransactions.filter((t) => t.type === "borrow").length,
      returnedCount: userTransactions.filter((t) => t.type === "return").length,
      totalSpent: userTransactions
        .filter((t) => t.type === "purchase")
        .reduce((total, t) => total + (t.amount || 0), 0),
    };
  },

  purchaseBook: (bookId, userId) => {
    const book = get().books.find((b) => b.id === bookId);
    const user = get().users.find((u) => u.id === userId);

    if (!book || !user || book.stockLevel <= 0) {
      return false;
    }

    set((state) => ({
      books: state.books.map((b) =>
        b.id === bookId ? { ...b, stockLevel: b.stockLevel - 1 } : b
      ),
      transactions: [
        ...state.transactions,
        {
          id: crypto.randomUUID(),
          userId,
          bookId,
          type: "purchase",
          date: new Date().toISOString(),
          amount: book.price,
        },
      ],
    }));

    get().updateStats();
    return true;
  },

  addBook: (book) => {
    set((state) => ({
      books: [...state.books, book],
    }));
    get().updateStats();
  },

  updateBook: (book) => {
    const exists = get().books.some((b) => b.id === book.id);
    if (!exists) return false;

    set((state) => ({
      books: state.books.map((b) => (b.id === book.id ? book : b)),
    }));
    get().updateStats();
    return true;
  },

  deleteBook: (bookId) => {
    set((state) => ({
      books: state.books.filter((b) => b.id !== bookId),
      wishlist: state.wishlist.filter((id) => id !== bookId),
      favorites: state.favorites.filter((id) => id !== bookId),
    }));
    get().updateStats();
  },
}));

// Initialize stats after store creation
useStore.getState().updateStats();

export default useStore;
