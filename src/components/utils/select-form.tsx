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
    { value: "classic-rock", label: "Classic Rock" },
    { value: "punk-rock", label: "Punk Rock" },
    { value: "folk", label: "Folk" },
    { value: "pop", label: "Pop" },
    { value: "pop-rock", label: "Pop Rock" },
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
