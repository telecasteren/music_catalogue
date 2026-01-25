import { useState } from "react";
import Alert from "@mui/material/Alert";
import type { MusicEntry } from "../../utils/types";
import PrimaryButton from "../primary-button";
import { AddIcon, CheckIcon, ErrorOutlineIcon } from "../utils/mui-icons";
import { DeleteBtn } from "./delete-button";
import { deleteAlbumEntry } from "../../utils/api/delete-album-entry";

export const Catalogue = ({ albums }: { albums: MusicEntry[] }) => {
  const PAGE_COUNT = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSeeMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDelete = async (id: number) => {
    if (isDeleting) return;
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
        <h1>Collection ({albums.length})</h1>
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
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Release Year</th>
            </tr>
          </thead>
          <tbody>
            {albums
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
      {currentPage * PAGE_COUNT < albums.length && (
        <PrimaryButton
          text="See more"
          icon={<AddIcon />}
          onClick={handleSeeMore}
        />
      )}
    </div>
  );
};
