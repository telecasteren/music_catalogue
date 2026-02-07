import { useEffect, useState } from "react";
import type { MusicEntry } from "../../utils/types";
import Alert from "@mui/material/Alert";
import PrimaryButton from "../primary-button";
import { AddIcon, CheckIcon, ErrorOutlineIcon } from "../utils/mui-icons";
import { DeleteBtn } from "./delete-button";
import { deleteAlbumEntry } from "../../utils/api/delete-album-entry";
import { SortButton } from "./sort-icon";
import { sortEvents } from "../../utils/events/sort-events";

export const Catalogue = ({ albums }: { albums: MusicEntry[] }) => {
  const PAGE_COUNT = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedAlbums, setSortedAlbums] = useState<MusicEntry[]>(albums);
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isDeleting, setIsDeleting] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sortKey) {
      setSortedAlbums(sortEvents(sortKey, albums, sortDirection));
    } else {
      setSortedAlbums(albums);
    }
  }, [albums, sortKey, sortDirection]);

  const handleSort = (key: string) => {
    const sameColumn = sortKey === key;
    const newDirection = sameColumn && sortDirection === "asc" ? "desc" : "asc";

    setSortKey(key);
    setSortDirection(newDirection);
    setCurrentPage(1);
  };

  const handleSeeMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDelete = async (id: number) => {
    if (isDeleting) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this album?",
    );
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await deleteAlbumEntry(id);
      setUserMessage(`Album ${id} deleted.`);
      setTimeout(() => setUserMessage(""), 3000);
    } catch (error) {
      setError(true);
      setUserMessage(
        `Error deleting album: ${id} - ` + (error as Error).message,
      );
      setTimeout(() => setUserMessage(""), 4000);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Collection ({sortedAlbums.length})</h1>
        <p>
          Updated list of albums per artist in my collection. The list is sorted
          by release year and alphabetically by artist name.
        </p>

        {userMessage && !error && (
          <Alert
            sx={{
              bgcolor: "#dff0d8",
              mt: 4,
              width: "fit-content",
              margin: "20px auto",
            }}
            variant="outlined"
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
          >
            {userMessage}
          </Alert>
        )}

        {userMessage && error && (
          <Alert
            sx={{
              bgcolor: "#f2dede",
              color: "red !important",
              mt: 4,
              width: "fit-content",
              margin: "20px auto",
            }}
            variant="outlined"
            icon={<ErrorOutlineIcon fontSize="inherit" />}
            severity="error"
          >
            {userMessage}
          </Alert>
        )}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  <span>Artist</span>
                  <SortButton onClick={() => handleSort("artist")} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>Album</span>
                  <SortButton onClick={() => handleSort("album")} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>Genre</span>
                  <SortButton onClick={() => handleSort("genre")} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>Release Year</span>
                  <SortButton onClick={() => handleSort("releaseYear")} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAlbums
              .slice(0, currentPage * PAGE_COUNT)
              .map((item: MusicEntry, index: number) => (
                <tr key={index}>
                  <td>{item.artist}</td>
                  <td>{item.album}</td>
                  <td>
                    {item.genre
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </td>
                  <td>
                    <div className="last-col-wrapper">
                      {item.releaseYear}
                      <DeleteBtn onClick={() => handleDelete(item.id)} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {currentPage * PAGE_COUNT < sortedAlbums.length && (
        <PrimaryButton
          text="See more"
          icon={<AddIcon />}
          onClick={handleSeeMore}
        />
      )}
    </div>
  );
};
