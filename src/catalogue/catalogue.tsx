import Library from "../utils/helpers/mockup-data.json";
import type { MusicEntry } from "../search/types";

export const Catalogue = () => {
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
            {Library.map((item: MusicEntry, index: number) => (
              <tr key={index}>
                <td>{item.artist}</td>
                <td>{item.album}</td>
                <td>{item.genre}</td>
                <td>{item.releaseYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
