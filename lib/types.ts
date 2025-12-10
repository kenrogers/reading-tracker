export interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  notes: Note[];
  createdAt: Date;
}
