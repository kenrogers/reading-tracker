"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Book, Note } from "@/lib/types";

interface BookCardProps {
  book: Book;
  onAddNote: (bookId: string, note: Note) => void;
}

export function BookCard({ book, onAddNote }: BookCardProps) {
  const [noteContent, setNoteContent] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      content: noteContent.trim(),
      createdAt: new Date(),
    };

    onAddNote(book.id, newNote);
    setNoteContent("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleAddNote} className="flex flex-col gap-2">
          <Textarea
            placeholder="Add a note..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            rows={2}
          />
          <Button type="submit" size="sm">
            Add Note
          </Button>
        </form>

        {book.notes.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Notes ({book.notes.length})
            </h4>
            <ul className="flex flex-col gap-2">
              {book.notes.map((note) => (
                <li
                  key={note.id}
                  className="rounded-md border bg-muted/50 p-3 text-sm"
                >
                  <p>{note.content}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {note.createdAt.toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
