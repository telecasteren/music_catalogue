import { useState } from "react";
import PrimaryButton from "./primary-button";
import { AddIcon } from "./utils/mui-icons";

export const Wishlist = () => {
  const PAGE_COUNT = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const albums = [
    {
      id: 1,
      artist: "The Beatles",
      album: "Taxman",
    },
    {
      id: 2,
      artist: "Creedence Clearwater Revival",
      album: "Black Moon Rising",
    },
  ];

  const handleSeeMore = () => setCurrentPage((p) => p + 1);
  const visibleAlbums = albums.slice(0, currentPage * PAGE_COUNT);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const artistInput = document.getElementById(
  //     "add-artist-wishlist",
  //   ) as HTMLInputElement | null;
  //   const albumInput = document.getElementById(
  //     "add-album-wishlist",
  //   ) as HTMLInputElement | null;

  //   if (artistInput && albumInput) {
  //     const newArtist = artistInput.value.trim();
  //     const newAlbum = albumInput.value.trim();
  //     if (newArtist && newAlbum) {
  //       console.log(`Adding "${newArtist} - ${newAlbum}" to wishlist...`);
  //     }
  //   }
  // };

  return (
    <div className="wishlist-container">
      <h1>Wishlist</h1>
      <p>List of records I want to acquire.</p>
      <p>-- Coming soon... --</p>

      <label htmlFor="form" id="wishlist-form-label">
        New entry to wishlist
      </label>
      <form
        style={{
          width: "100%",
        }}
      >
        <input
          type="text"
          id="add-artist-wishlist"
          placeholder="Enter artist..."
          className="wishlist-input"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
            color: "#333",
          }}
        />
        <input
          type="text"
          id="add-album-wishlist"
          placeholder="Enter album..."
          className="wishlist-input"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            color: "#333",
          }}
        />
        <PrimaryButton
          text="Add to wishlist"
          icon={<AddIcon />}
          type="submit"
        />
      </form>

      <ul className="wishlist-ul">
        <h2>Artist | Album</h2>
        {visibleAlbums.map((album) => (
          <li key={album.id}>
            {album.artist} - {album.album}
          </li>
        ))}
      </ul>

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
