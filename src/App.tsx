import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { AdminDashboard } from "./components/AdminDashboard";
import { BookCatalog } from "./components/BookCatalog";
import { UserManagement } from "./components/UserManagement";
import { TransactionHistory } from "./components/TransactionHistory";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import type { Book } from "./types";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

// Sample data
const sampleBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    category: "Fiction",
    price: 14.99,
    stockLevel: 5,
    status: "available",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    description: "A story of decadence and excess.",
    borrowCount: 25,
    lastBorrowed: "2024-03-01",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    category: "Fiction",
    price: 12.99,
    stockLevel: 3,
    status: "borrowed",
    coverUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    description: "A classic of modern American literature.",
    borrowCount: 18,
    lastBorrowed: "2024-02-28",
  },
];

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [books, setBooks] = useState(sampleBooks);

  const handleBookAction = (action: "borrow" | "purchase", bookId: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          if (action === "borrow") {
            return { ...book, status: "borrowed" as const };
          } else if (action === "purchase") {
            return {
              ...book,
              stockLevel: book.stockLevel - 1,
              status:
                book.stockLevel <= 1 ? ("reserved" as const) : book.status,
            };
          }
        }
        return book;
      })
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <AdminDashboard />;
      case "books":
        return <BookCatalog books={books} onBookAction={handleBookAction} />;
      case "users":
        return <UserManagement />;
      case "transactions":
        return <TransactionHistory />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 p-8 overflow-auto">{renderContent()}</main>
    </div>
  );
}

export default App;
