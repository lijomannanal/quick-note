import NoteIcon from "@mui/icons-material/StickyNote2";
import ArchiveIcon from "@mui/icons-material/Archive";

export enum NoteCategory {
  DEFAULT = "",
  PERSONAL = "Personal",
  WORK = "Work",
  OTHERS = "Others",
}

export enum AllTabs {
  ALL = "All",
  PERSONAL = "Personal",
  WORK = "Work",
  OTHERS = "Others",
}
export const TabColors = {
  [AllTabs.ALL]: "#5484ab",
  [AllTabs.PERSONAL]: "#388e3c",
  [AllTabs.WORK]: "#77637f",
  [AllTabs.OTHERS]: "#f57c00",
};

export const MenuItems = [
  {
    title: "Notes",
    path: "/",
    icon: NoteIcon,
  },
  {
    title: "Archive",
    path: "/archive",
    icon: ArchiveIcon,
  },
];

export const Device = {
  Desktop: "(min-width:992px)",
  Mobile: "(max-width:600px)",
  Tablet: "(max-width:1180px)",
};

export const SampleNote = {
  id: 1,
  title: "Sample Personal Note",
  content: "This is a sample note by the developer",
  category: NoteCategory.PERSONAL,
  isArchived: "no",
  date: new Date(),
};

export const DeletedNoteFlag = "hasDeletedSampleNote";
