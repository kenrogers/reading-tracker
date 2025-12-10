"use client";

import { useState } from "react";
import { AddBookForm } from "@/components/add-book-form";
import { BookCard } from "@/components/book-card";
import type { Book, Note } from "@/lib/types";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  const handleAddBook = (book: Book) => {
    setBooks((prev) => [book, ...prev]);
  };

  const handleAddNote = (bookId: string, note: Note) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, notes: [note, ...book.notes] } : book
      )
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-8 dark:bg-black">
      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight">Reading Tracker</h1>

        <AddBookForm onAddBook={handleAddBook} />

        {books.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No books yet. Add one above to get started!
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onAddNote={handleAddNote} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
