"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createNote } from "@/lib/actions";

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

interface Book {
  id: string;
  title: string;
  author: string;
  notes: Note[];
  createdAt: Date;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddNote = async (formData: FormData): Promise<void> => {
    startTransition(async () => {
      const result = await createNote(formData);
      if (!result.error) {
        router.refresh();
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form action={handleAddNote} className="flex flex-col gap-2">
          <input type="hidden" name="bookId" value={book.id} />
          <Textarea name="content" placeholder="Add a note..." rows={2} />
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? "Adding..." : "Add Note"}
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
                    {new Date(note.createdAt).toLocaleDateString()}
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
