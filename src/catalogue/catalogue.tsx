import { useState } from "react";
import type { MusicEntry } from "../utils/types";
import PrimaryButton from "../components/primary-button";
import { AddIcon } from "../components/utils/mui-icons";

export const Catalogue = ({ albums }: { albums: MusicEntry[] }) => {
  const PAGE_COUNT = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handleSeeMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div>
        <h1>Collection ({albums.length})</h1>
        <p>
          Updated list of albums per artist in my collection. The list is sorted
          by release year and alphabetically by artist name.
        </p>
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
                  <td>{item.releaseYear}</td>
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
