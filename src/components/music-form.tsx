import { useState } from "react";
import InputField from "./input-field";
import PrimaryButton from "./primary-button";
import { AlbumIcon } from "./utils/mui-icons";
import type { MusicEntry } from "../utils/types";
import { SelectForm } from "./utils/select-form";
import type { SelectChangeEvent } from "@mui/material";
import { DatePickerElement } from "./utils/mui-datepicker";
import dayjs from "dayjs";

interface MusicFormProps {
  onSubmit: (album: Omit<MusicEntry, "id" | "addedDate">) => void;
}

const MusicForm = ({ onSubmit }: MusicFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    artist: "",
    album: "",
    genre: "",
    releaseYear: 0,
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
    const missingFields = [];
    if (!form.artist) missingFields.push("Artist");
    if (!form.album) missingFields.push("Album");
    if (!form.genre) missingFields.push("Genre");
    if (!form.releaseYear) missingFields.push("Release Year");

    if (missingFields.length > 0) {
      setError(`Required fields left: ${missingFields.join(", ")}`);
      return;
    }

    setError(null);
    onSubmit(form);
  };

  return (
    <div className="music-form-container">
      {error && (
        <div className="form-error" style={{ color: "red", marginBottom: 12 }}>
          {error}
        </div>
      )}
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
        <DatePickerElement
          value={form.releaseYear ? dayjs(`${form.releaseYear}`) : null}
          onChange={(date: dayjs.Dayjs | null) => {
            setForm({ ...form, releaseYear: date ? date.year() : 0 });
          }}
        />

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
