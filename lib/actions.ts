"use server";

import { db } from "@/lib/db";
import { books, notes } from "@/lib/db/schema";
import { createBookSchema, createNoteSchema } from "@/lib/validations";
import { desc } from "drizzle-orm";

export async function getBooks() {
  return db.query.books.findMany({
    with: { notes: { orderBy: [desc(notes.createdAt)] } },
    orderBy: [desc(books.createdAt)],
  });
}

export async function createBook(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    author: formData.get("author"),
  };

  const result = createBookSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const [book] = await db
    .insert(books)
    .values({
      title: result.data.title,
      author: result.data.author,
    })
    .returning();

  return { book };
}

export async function createNote(formData: FormData) {
  const raw = {
    bookId: formData.get("bookId"),
    content: formData.get("content"),
  };

  const result = createNoteSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const [note] = await db
    .insert(notes)
    .values({
      bookId: result.data.bookId,
      content: result.data.content,
    })
    .returning();

  return { note };
}
