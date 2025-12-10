"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Book } from "@/lib/types";

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
}

export function AddBookForm({ onAddBook }: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: title.trim(),
      author: author.trim(),
      notes: [],
      createdAt: new Date(),
    };

    onAddBook(newBook);
    setTitle("");
    setAuthor("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Button type="submit">Add Book</Button>
        </form>
      </CardContent>
    </Card>
  );
}
