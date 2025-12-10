import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
  author: z.string().min(1, "Author is required").max(500),
});

export const createNoteSchema = z.object({
  bookId: z.string().uuid("Invalid book ID"),
  content: z.string().min(1, "Note content is required").max(10000),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
