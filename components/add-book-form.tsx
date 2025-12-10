"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBook } from "@/lib/actions";

export function AddBookForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData: FormData): Promise<void> => {
    startTransition(async () => {
      const result = await createBook(formData);
      if (!result.error) {
        router.refresh();
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <Input name="title" placeholder="Book title" required />
          <Input name="author" placeholder="Author" required />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
