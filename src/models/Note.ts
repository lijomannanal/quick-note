import { NoteCategory } from "../constants";

export interface INote {
  id: number;
  title: string;
  content: string;
  category: NoteCategory;
  isArchived: string;
  date: Date;
}
export type INoteSchema = Pick<INote, "title" | "category" | "content">;
