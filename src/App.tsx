import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import "./css/App.css";
import "./css/components/music-form.css";
import MusicForm from "./components/music-form";
import InputField from "./components/input-field";
import PrimaryButton from "./components/primary-button";
import type { MusicEntry } from "./utils/types";
import { Catalogue } from "./components/catalogue/catalogue";
import { addAlbumEntry } from "./utils/api/albums/add-album-entry";
import { searchCatalogueEvents } from "./utils/events/search-events";
import { Wishlist } from "./components/Wishlist";
import {
  LibraryMusicIcon,
  LibraryAddIcon,
  SearchIcon,
  CheckIcon,
  ErrorOutlineIcon,
  CakeIcon,
} from "./components/utils/mui-icons";

const App = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [albums, setAlbums] = useState<MusicEntry[]>([]);
  const [results, setResults] = useState<MusicEntry[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeView, setActiveView] = useState<"catalogue" | "wishlist">(
    "catalogue",
  );

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch("/albums");
      if (!response.ok) {
        setIsSuccess(false);
        setUserMessage("Failed to fetch albums. " + response.statusText);
        return;
      }
      const data = (await response.json()) as MusicEntry[];
      const sortedResults = data.sort((a, b) =>
        a.artist.localeCompare(b.artist),
      );
      setAlbums(sortedResults);
    };
    fetchAlbums();
  }, []);

  const setForm = () => {
    setDisplayForm(true);
  };

  const setCatalogue = () => {
    setDisplayForm(false);
    setActiveView("catalogue");
  };

  const seeWishlist = () => {
    setDisplayForm(false);
    setActiveView("wishlist");
    setHasSearched(false);
  };

  const handleSearch = () => {
    const results = searchCatalogueEvents(albums);
    setResults(results);
    setHasSearched(true);
  };

  const handleAddingAlbums = async (
    albumData: Omit<MusicEntry, "id" | "addedDate">,
  ) => {
    try {
      const newAlbum = await addAlbumEntry(albumData);
      if (newAlbum) {
        setAlbums((prev) => [newAlbum, ...prev]);
        setDisplayForm(false);
        setUserMessage("Album added to collection.");
        setIsSuccess(true);
        setTimeout(() => setUserMessage(""), 3000);
      }
    } catch (error) {
      setUserMessage((error as Error).message);
      setIsSuccess(false);
      setTimeout(() => setUserMessage(""), 4000);
    }
  };

  return (
    <>
      <h1>GrammoFon</h1>

      {activeView === "catalogue" && (
        <div className="search-container">
          <InputField id="search-bar" label="Search catalogue..." />
          <PrimaryButton
            text="Search"
            icon={<SearchIcon />}
            onClick={() => handleSearch()}
          />
        </div>
      )}

      <div className="action-options">
        <PrimaryButton
          text="Wishlist"
          icon={<CakeIcon />}
          onClick={seeWishlist}
        />

        <PrimaryButton
          text="Catalogue"
          icon={<LibraryMusicIcon />}
          onClick={setCatalogue}
        />

        {activeView === "catalogue" && (
          <PrimaryButton
            text="New entry"
            icon={<LibraryAddIcon />}
            onClick={setForm}
          />
        )}
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

      {displayForm && <MusicForm onSubmit={handleAddingAlbums} />}

      {!displayForm &&
        activeView === "catalogue" &&
        (hasSearched ? (
          results.length > 0 ? (
            <Catalogue albums={results} />
          ) : (
            <div>No results found</div>
          )
        ) : (
          <Catalogue albums={albums} />
        ))}

      {!displayForm && activeView === "wishlist" && <Wishlist />}
    </>
  );
};

export default App;
