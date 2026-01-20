import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import "./css/App.css";
import "./css/components/music-form.css";
import MusicForm from "./components/music-form";
import InputField from "./components/input-field";
import PrimaryButton from "./components/primary-button";
import type { MusicEntry } from "./utils/types";
import {
  LibraryMusicIcon,
  LibraryAddIcon,
  SearchIcon,
  CheckIcon,
  ErrorOutlineIcon,
} from "./components/utils/mui-icons";
import { Catalogue } from "./catalogue/catalogue";
import { handleAddAlbum } from "./utils/api/add-album-entry";

const App = () => {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [albums, setAlbums] = useState<MusicEntry[]>([]);
  const [results, setResults] = useState<MusicEntry[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch("/albums");
      if (!response.ok) {
        console.error("Failed to fetch albums:", response.statusText);
        return;
      }
      const data = await response.json();
      setAlbums(data);
    };

    fetchAlbums();
  }, []);

  const setSearch = () => {
    setDisplaySearchBar(true);
  };

  const setForm = () => {
    setDisplayForm(true);
  };

  const setCatalogue = () => {
    setDisplaySearchBar(false);
    setDisplayForm(false);
  };

  const handleSearch = () => {
    const searchInput = document.getElementById(
      "search-bar",
    ) as HTMLInputElement;

    const query = searchInput.value;
    const searchResults = albums.filter(
      (item) =>
        item.artist.toLowerCase().includes(query) ||
        item.album.toLowerCase().includes(query) ||
        item.genre.toLowerCase().includes(query) ||
        String(item.releaseYear).includes(query),
    );
    setResults(searchResults);
    setHasSearched(true);
  };

  const handleAddAlbumAndNotify = async (
    albumData: Omit<MusicEntry, "id" | "addedDate">,
  ) => {
    const newAlbum = await handleAddAlbum(albumData);
    if (newAlbum) {
      setAlbums((prev) => [newAlbum, ...prev]);
      setDisplayForm(false);
      setUserMessage("Album added to collection.");
      setIsSuccess(true);
      setTimeout(() => setUserMessage(""), 3000);
    } else {
      setUserMessage("Couldn't add album.");
      setIsSuccess(false);
      setTimeout(() => setUserMessage(""), 4000);
    }
  };

  return (
    <>
      <h1>That 70's Music Catalogue</h1>
      <div className="action-options">
        <PrimaryButton
          text="See catalogue"
          icon={<LibraryMusicIcon />}
          onClick={setCatalogue}
        />
        <PrimaryButton
          text="Search catalogue"
          icon={<SearchIcon />}
          onClick={setSearch}
        />
        <PrimaryButton
          text="Add new entry"
          icon={<LibraryAddIcon />}
          onClick={setForm}
        />
      </div>

      {userMessage && isSuccess && (
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

      {userMessage && !isSuccess && (
        <Alert
          sx={{
            bgcolor: "#f2dede",
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

      {displaySearchBar && (
        <div className="search-container">
          <InputField id="search-bar" label="Search catalogue" />
          <PrimaryButton
            text="Search"
            icon={<SearchIcon />}
            onClick={() => handleSearch()}
          />
        </div>
      )}
      {hasSearched && results.length === 0 ? <div>No results found</div> : null}

      {displayForm && <MusicForm onSubmit={handleAddAlbumAndNotify} />}
      {!displaySearchBar && !displayForm && <Catalogue albums={albums} />}
      {displaySearchBar && hasSearched && results.length > 0 && (
        <Catalogue albums={results} />
      )}
    </>
  );
};

export default App;
