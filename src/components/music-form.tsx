import { useState } from "react";
import InputField from "./input-field";
import PrimaryButton from "./primary-button";
import { AlbumIcon } from "./utils/mui-icons";
import type { MusicEntry } from "../utils/types";
import { SelectForm } from "./utils/select-form";
import type { SelectChangeEvent } from "@mui/material";
// import { NumberField } from "./utils/number-field";

interface MusicFormProps {
  onSubmit: (album: Omit<MusicEntry, "id" | "addedDate">) => void;
}

const MusicForm = ({ onSubmit }: MusicFormProps) => {
  const [form, setForm] = useState({
    artist: "",
    album: "",
    genre: "",
    releaseYear: "",
    // releaseYear: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setForm({
      ...form,
      genre: e.target.value as string,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onSubmit({ ...form, releaseYear: Number(form.releaseYear) });
      console.log("Form submitted");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="music-form-container">
      <form className="music-form" onSubmit={handleSubmit}>
        <InputField
          label="Artist"
          id="artist"
          value={form.artist}
          onChange={handleChange}
        />
        <InputField
          label="Album"
          id="album"
          value={form.album}
          onChange={handleChange}
        />
        <SelectForm value={form.genre} onChange={handleSelectChange} />
        <InputField
          label="Release Year"
          id="releaseYear"
          value={form.releaseYear}
          onChange={handleChange}
        />
        {/* <NumberField
          label="Release Year"
          min={1900}
          max={new Date().getFullYear()}
          id="releaseYear"
          value={form.releaseYear ?? 0}
          onValueChange={(value) =>
            setForm({ ...form, releaseYear: value ?? 0 })
          }
        /> */}

        <PrimaryButton
          text="Add to catalogue"
          type="submit"
          icon={<AlbumIcon />}
        />
      </form>
    </div>
  );
};

export default MusicForm;
