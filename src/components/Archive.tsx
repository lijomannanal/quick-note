import { Box, Stack } from "@mui/material";
import PageTitle from "./PageTitle";
import SearchBar from "./SearchBar";
import { useCallback, useEffect, useState } from "react";
import { useIndexedDB } from "../hooks/useIndexedDB";
import type { INote } from "../models/Note";
import Loader from "./Loader";
import EmptyNote from "./EmptyNote";
import NoteCard from "./NoteCard";
import { basePath } from "../../basepath";

export default function Archive() {
  const [loading, setLoading] = useState(true);
  const [filteredArchives, setFilteredArchives] = useState<INote[]>([]);
  const [searchText, setSearchText] = useState("");
  const {
    data: archives,
    update,
    loading: dbLoading,
  } = useIndexedDB<INote>("notes", "isArchived", "yes");

  useEffect(() => {
    setLoading(true);
    let currentArchives = [...archives];
    if (searchText) {
      currentArchives = archives.filter(
        (note) =>
          note.title.includes(searchText) || note.content.includes(searchText)
      );
    }
    setFilteredArchives(currentArchives);

    if (!dbLoading) {
      setLoading(false);
    }
  }, [archives, searchText, dbLoading]);

  const onUnArchiveNote = useCallback(
    async (id: number) => {
      const archive = archives.find((note) => note.id === id);
      if (archive) {
        await update({
          ...archive,
          isArchived: "no",
        });
      }
    },
    [archives, update]
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageTitle text="Archive" />
        <SearchBar
          searchText={searchText}
          placeholder="Search archive..."
          onSearch={(text) => setSearchText(text)}
        />
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Stack
          sx={{ display: "flex", flexWrap: "wrap", marginBlock: "2rem" }}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          useFlexGap
        >
          {!filteredArchives.length ? (
            searchText ? (
              <EmptyNote
                caption={`Couldn't find any archives`}
                imagePath={`/${basePath}/note-not-found.svg`}
                altText={`No search results`}
              />
            ) : (
              <EmptyNote
                caption={`You don't have any archives`}
                imagePath={`/${basePath}/empty-archive-illustration.svg`}
                altText={`No archives illustration`}
              />
            )
          ) : (
            filteredArchives.map((note) => (
              <NoteCard key={note.id} {...note} onUnArchive={onUnArchiveNote} />
            ))
          )}
        </Stack>
      )}
    </>
  );
}
