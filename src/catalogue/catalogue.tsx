import type { MusicEntry } from "../utils/types";

export const Catalogue = ({ albums }: { albums: MusicEntry[] }) => {
  return (
    <div>
      <div>
        <h1>Collection</h1>
        <p>Updated list of albums per artist in my collection.</p>
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
            {albums.map((item: MusicEntry, index: number) => (
              <tr key={index}>
                <td>{item.artist}</td>
                <td>{item.album}</td>
                <td>
                  {item.genre
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </td>
                <td>{item.releaseYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
