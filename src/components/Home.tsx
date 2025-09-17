import { Box, Stack } from "@mui/material";
import SearchBar from "./SearchBar";
import AddNoteButton from "./AddNoteButton";
import NoteTabs from "./NoteTabs";
import {
  useCallback,
  useEffect,
  useState,
  type BaseSyntheticEvent,
} from "react";
import NoteCard from "./NoteCard";
import { useIndexedDB } from "../hooks/useIndexedDB";
import { type INote, type INoteSchema } from "../models/Note";
import {
  AllTabs,
  DeletedNoteFlag,
  NoteCategory,
  SampleNote,
} from "../constants";
import EmptyNote from "./EmptyNote";
import AddNoteDialog from "./AddEditNoteDialog";
import Loader from "./Loader";
import DeleteDialog from "./DeleteDialog";
import SnackbarAlert from "./SnackbarAlert";
import { SnackbarVariants } from "../models/common";
import PageTitle from "./PageTitle";
import { basePath } from "../../basepath";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [tabLabel, setTabLabel] = useState(AllTabs.ALL);
  const [displayNotes, setDisplayNotes] = useState<INote[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    noteId: undefined | number;
  }>({ open: false, noteId: undefined });

  const [showMessage, setShowMessage] = useState({ show: false, message: "" });

  const {
    data: notes,
    add,
    update,
    remove,
    loading: dbLoading,
  } = useIndexedDB<INote>("notes", "isArchived", "no");
  const [selectedNote, setSelectedNote] = useState<INote>();

  const createSampleNote = useCallback(async () => {
    await add(SampleNote);
  }, [add]);

  useEffect(() => {
    setLoading(true);
    let currentNotes = [...notes];
    const hasDeletedSampleNote = localStorage.getItem(DeletedNoteFlag);
    if (!currentNotes.length && !hasDeletedSampleNote) {
      createSampleNote();
    }
    if (tabLabel !== AllTabs.ALL) {
      currentNotes = notes.filter(
        (note) => note.category === (tabLabel as unknown as NoteCategory)
      );
    }
    if (searchText) {
      currentNotes = currentNotes.filter(
        (note) =>
          note.title.includes(searchText) || note.content.includes(searchText)
      );
    }
    setDisplayNotes(currentNotes);
    if (!dbLoading) {
      setLoading(false);
    }
  }, [
    notes,
    loading,
    createSampleNote,
    setTabLabel,
    tabLabel,
    searchText,
    dbLoading,
  ]);

  const onTabChange = useCallback(
    (event: BaseSyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
      setTabLabel(event.target.innerText);
    },
    []
  );

  const onAddNote = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const onDeleteNote = useCallback((id: number) => {
    setDeleteDialog({ open: true, noteId: id });
  }, []);

  const onDeleteNoteConfirm = useCallback(async () => {
    await remove(deleteDialog.noteId as number);
    setDeleteDialog({ open: false, noteId: undefined });
    setShowMessage({
      show: true,
      message: "Note has been deleted successfully!",
    });
    if (deleteDialog.noteId) {
      localStorage.setItem(DeletedNoteFlag, "true");
    }
  }, [remove, deleteDialog.noteId]);

  const onEditNote = useCallback(
    (id: number) => {
      setSelectedNote(notes.find((note) => note.id === id));
      setOpenDialog(true);
    },
    [notes]
  );

  const onArchiveNote = useCallback(
    async (id: number) => {
      const note = notes.find((note) => note.id === id);
      if (note) {
        await update({
          ...note,
          isArchived: "yes",
        });
      }
    },
    [notes, update]
  );

  const onDialogClose = useCallback(() => {
    setOpenDialog(false);
    setSelectedNote(undefined);
  }, []);

  const onDeleteDialogClose = useCallback(() => {
    setDeleteDialog({ open: false, noteId: undefined });
  }, []);

  const onSubmitNote = useCallback(
    async (data: INoteSchema) => {
      if (!selectedNote) {
        await add({
          ...data,
          isArchived: "no",
          date: new Date(),
        });
      } else {
        await update({
          ...selectedNote,
          ...data,
        });
      }
      setShowMessage({
        show: true,
        message: "Note has been saved successfully!",
      });
    },
    [add, selectedNote, update]
  );

  const hideToast = useCallback(() => {
    setShowMessage({ show: false, message: "" });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageTitle text="Notes" />
        <SearchBar
          searchText={searchText}
          placeholder="Search notes..."
          onSearch={(text) => setSearchText(text)}
        />
      </Box>
      <Stack
        sx={{ marginBlock: "2rem", gap: "1rem" }}
        direction="row"
        justifyContent="space-between"
      >
        <NoteTabs value={tabIndex} onChange={onTabChange} />
        <AddNoteButton onClick={onAddNote} />
      </Stack>
      {loading && !openDialog ? (
        <Loader />
      ) : (
        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          useFlexGap
        >
          {!displayNotes.length ? (
            searchText ? (
              <EmptyNote
                caption={`Couldn't found any notes`}
                imagePath={`/${basePath}/note-not-found.svg`}
                altText={`No search results illustration`}
              />
            ) : (
              <EmptyNote
                caption={`You don't have any notes`}
                imagePath={`/${basePath}/empty-note-illustration.svg`}
                altText={`No notes illustration`}
              />
            )
          ) : (
            displayNotes.map((note) => (
              <NoteCard
                key={note.id}
                {...note}
                onDelete={onDeleteNote}
                onEdit={onEditNote}
                onArchive={onArchiveNote}
              />
            ))
          )}
        </Stack>
      )}
      <AddNoteDialog
        key={selectedNote?.id}
        note={selectedNote}
        open={openDialog}
        onClose={onDialogClose}
        onSubmit={onSubmitNote}
      />

      <DeleteDialog
        open={deleteDialog.open}
        onConfirm={onDeleteNoteConfirm}
        onClose={onDeleteDialogClose}
      />
      <SnackbarAlert
        open={showMessage.show}
        handleClose={hideToast}
        message={showMessage.message}
        variant={SnackbarVariants.SUCCESS}
      />
    </>
  );
}
