import { useEffect, useState } from "react";
import PrimaryButton from "./primary-button";
import { AddIcon, SearchIcon } from "./utils/mui-icons";
import { UserMessage } from "./utils/user-message";
import { addWishlistEntry } from "../utils/api/wishlist/add-wishlist-entry";
import { deleteWishlistEntry } from "../utils/api/wishlist/delete-wishlist-entry";
import type { WishList } from "../utils/types";
import { DeleteBtn } from "./catalogue/delete-button";
import InputField from "./input-field";
import { searchWishlistEvents } from "../utils/events/search-events";

export const Wishlist = () => {
  const PAGE_COUNT = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [userMessage, setUserMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [wishlist, setWishlist] = useState<WishList[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await fetch("/wishlist");
      if (!response.ok) {
        setIsSuccess(false);
        setUserMessage("Failed to fetch wishlist. " + response.statusText);
        return;
      }
      const data = (await response.json()) as WishList[];
      const sortedResults = data.sort((a, b) =>
        a.artist.localeCompare(b.artist),
      );
      setWishlist(sortedResults);
    };
    fetchWishlist();
  }, []);

  const handleSearch = () => {
    const searchInput = document.getElementById(
      "search-bar",
    ) as HTMLInputElement;

    if (hasSearched) {
      setWishlist(wishlist);
      setHasSearched(false);
      setUserMessage("");
      searchInput.value = "";
      return;
    }

    const results = searchWishlistEvents(wishlist);
    if (results.length === 0) {
      setUserMessage("No results found.");
      setIsSuccess(false);
    } else {
      setWishlist(results);
      setUserMessage("");
      setIsSuccess(true);
    }
    setHasSearched(true);
  };

  const handleSeeMore = () => setCurrentPage((p) => p + 1);
  const visibleAlbums = wishlist.slice(0, currentPage * PAGE_COUNT);

  const setForm = () => {
    setDisplayForm(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newArtist = artist.trim();
    const newAlbum = album.trim();

    if (!newArtist || !newAlbum) return;

    const albumData: Omit<WishList, "id"> = {
      artist: newArtist,
      album: newAlbum,
    };

    try {
      const newAlbum = await addWishlistEntry(albumData);
      if (newAlbum) {
        setWishlist((prev) => [newAlbum, ...prev]);
        setArtist("");
        setAlbum("");

        setUserMessage(
          `Album ${newArtist} - ${newAlbum.album} added to wishlist.`,
        );
        setIsSuccess(true);
        setTimeout(() => setUserMessage(""), 3000);
      }
    } catch (error) {
      setUserMessage((error as Error).message);
      setIsSuccess(false);
      setTimeout(() => setUserMessage(""), 4000);
    }
  };

  const handleDelete = async (id: number) => {
    if (isDeleting) return;
    const albumToDelete = `${wishlist.find((item) => item.id === id)?.artist} - ${wishlist.find((item) => item.id === id)?.album}`;

    const confirm = window.confirm(
      `Are you sure you want to delete ${albumToDelete} from your wishlist?`,
    );
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await deleteWishlistEntry(id);
      setUserMessage(`Album ${albumToDelete} deleted from wishlist.`);
      setIsSuccess(true);
      setTimeout(() => setUserMessage(""), 3000);
    } catch (error) {
      setIsSuccess(false);
      setUserMessage(
        `Error deleting album: ${id} - ` + (error as Error).message,
      );
      setTimeout(() => setUserMessage(""), 4000);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="wishlist-container">
      <h1>Wishlist</h1>
      <p>A list of records I want to acquire.</p>

      <PrimaryButton
        text="Add new entry"
        icon={<AddIcon />}
        type="button"
        onClick={setForm}
      />

      {displayForm && (
        <form
          style={{
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <div className="wishlist-input-container">
            <InputField
              label="Artist"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <InputField
              label="Album"
              id="album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </div>
          <PrimaryButton
            text="Add to wishlist"
            icon={<AddIcon />}
            type="submit"
          />
        </form>
      )}

      <div className="search-container">
        <InputField id="search-bar" label="Search wishlist..." />
        <PrimaryButton
          text={hasSearched ? "Clear search" : "Search"}
          icon={<SearchIcon />}
          onClick={() => handleSearch()}
        />
      </div>

      {userMessage && isSuccess && (
        <UserMessage userMessage={userMessage} isSuccess={isSuccess} />
      )}

      {userMessage && !isSuccess && (
        <UserMessage userMessage={userMessage} isSuccess={!isSuccess} />
      )}

      <ul className="wishlist-ul">
        <h2>Artist | Album</h2>
        {visibleAlbums.map((album) => (
          <li key={album.id}>
            {album.artist} - {album.album}
            <DeleteBtn onClick={() => handleDelete(album.id)} />
          </li>
        ))}
      </ul>

      {currentPage * PAGE_COUNT < wishlist.length && (
        <PrimaryButton
          text="See more"
          icon={<AddIcon />}
          onClick={handleSeeMore}
        />
      )}
    </div>
  );
};
