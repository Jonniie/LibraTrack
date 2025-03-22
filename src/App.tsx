import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { AdminDashboard } from "./components/AdminDashboard";
import { BookCatalog } from "./components/BookCatalog";
import { BorrowedBooks } from "./components/BorrowedBooks";
import { Favorites } from "./components/Favorites";
import { UserManagement } from "./components/UserManagement";
import { TransactionHistory } from "./components/TransactionHistory";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import { SignIn, SignedOut, SignedIn } from "@clerk/clerk-react";
import type { BookType } from "./types";
import { UserDashboard } from "./components/UserDashboard";
import { useUser } from "@clerk/clerk-react";

// Admin emails list - in a real app, this would come from your backend
const ADMIN_EMAILS = ["admin@gmail.com"];

function App() {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error loading the books data:", error));
  }, []);

  const [activeView, setActiveView] = useState("dashboard");
  const { user } = useUser();

  const isAdmin =
    user && ADMIN_EMAILS.includes(user.primaryEmailAddress?.emailAddress || "");

  const username =
    user && user.username
      ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
      : "";

  const handleBookAction = (
    action: "borrow" | "purchase" | "favorite",
    bookId: string
  ) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          if (action === "borrow") {
            return {
              ...book,
              status: "borrowed" as const,
              lastBorrowed: new Date().toISOString(),
            };
          } else if (action === "purchase") {
            return {
              ...book,
              stockLevel: book.stockLevel - 1,
              status:
                book.stockLevel <= 1 ? ("reserved" as const) : book.status,
            };
          } else if (action === "favorite") {
            return {
              ...book,
              status: "favorites" as const,
              lastBorrowed: new Date().toISOString(),
            };
          }
        }
        return book;
      })
    );
  };

  const handleReturnBook = (bookId: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          return {
            ...book,
            status: "available" as const,
            borrowCount: (book.borrowCount || 0) + 1,
          };
        }
        return book;
      })
    );
  };

  const renderContent = () => {
    // Show dashboard based on user role
    if (activeView === "dashboard") {
      return isAdmin ? (
        <AdminDashboard books={books} />
      ) : (
        <UserDashboard books={books} username={username} />
      );
    }

    switch (activeView) {
      case "books":
        return <BookCatalog books={books} onBookAction={handleBookAction} />;
      case "borrowed":
        return <BorrowedBooks books={books} onReturn={handleReturnBook} />;
      case "favorites":
        return <Favorites />;
      case "users":
        return isAdmin ? <UserManagement /> : null;
      case "transactions":
        return <TransactionHistory />;
      case "reports":
        return isAdmin ? <Reports /> : null;
      case "settings":
        return <Settings />;
      default:
        return isAdmin ? (
          <AdminDashboard books={books} />
        ) : (
          <UserDashboard books={books} username={username} />
        );
    }
  };

  return (
    <div className="h-[100vh] flex min-h-screen bg-gray-50">
      <SignedOut>
        <div className="w-full flex items-center justify-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          isAdmin={isAdmin}
          username={username}
        />
        <main className="flex-1 p-8 overflow-auto">{renderContent()}</main>
      </SignedIn>
    </div>
  );
}

export default App;
