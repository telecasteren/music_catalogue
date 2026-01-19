import TextField from "@mui/material/TextField";

interface InputFieldProps {
  label: string;
  id: string;
}

const InputField = ({ label, id }: InputFieldProps) => {
  return (
    <TextField
      sx={{
        "& .MuiInputBase-input": {
          color: "var(--input-field-primary)",
          "&::placeholder": {
            color: "var(--input-field-primary)",
          },
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
      }}
      id={id}
      label={label}
      variant="outlined"
    />
  );
};

export default InputField;
