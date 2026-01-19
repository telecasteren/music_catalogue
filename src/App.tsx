import { useState } from "react";
import "./css/App.css";
import "./css/components/music-form.css";
import MusicForm from "./components/form";
import InputField from "./components/input-field";
import PrimaryButton from "./components/primary-button";
import { searchLibrary } from "./search/search";
import type { MusicEntry } from "./search/types";
import {
  LibraryMusicIcon,
  LibraryAddIcon,
  SearchIcon,
} from "./components/utils/mui-icons";
import { Catalogue } from "./catalogue/catalogue";

const App = () => {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [results, setResults] = useState<MusicEntry[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

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
    const searchResults = searchLibrary(query);
    setResults(searchResults);
    setHasSearched(true);

    console.log(searchResults);
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

      {displayForm && <MusicForm />}
      {!displaySearchBar && !displayForm && <Catalogue />}
    </>
  );
};

export default App;
