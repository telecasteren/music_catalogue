import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface SelectFormProps {
  value: string;
  onChange: (e: SelectChangeEvent) => void;
}

export const SelectForm = ({ value, onChange }: SelectFormProps) => {
  const menuItemList = [
    { value: "heavy-metal", label: "Heavy Metal" },
    { value: "rock", label: "Rock" },
    { value: "punk-rock", label: "Punk Rock" },
    { value: "folk", label: "Folk" },
    { value: "pop", label: "Pop" },
    { value: "jazz", label: "Jazz" },
    { value: "classical", label: "Classical" },
  ];

  return (
    <FormControl fullWidth>
      <InputLabel
        id="genre-label"
        sx={{
          color: "var(--input-field-primary)",
          "&.Mui-focused": {
            color: "var(--input-field-secondary)",
          },
        }}
      >
        Genre
      </InputLabel>
      <Select
        labelId="genre-label"
        id="genre"
        value={value}
        label="Genre"
        onChange={onChange}
        sx={{
          "& .MuiInputBase-input": {
            color: "var(--input-field-primary)",
          },
          "& .MuiInputLabel-root": {
            color: "var(--input-field-primary)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--input-field-secondary)",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--input-field-secondary)",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "var(--input-field-primary)",
            },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--input-field-hover)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--input-field-secondary)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--input-field-primary)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--input-field-hover)",
          },
          "& .MuiSelect-icon": {
            color: "var(--input-field-primary)",
          },
        }}
      >
        {menuItemList.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
