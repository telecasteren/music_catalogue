import TextField from "@mui/material/TextField";

interface InputFieldProps {
  label: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const InputField = ({ label, id, onChange, value }: InputFieldProps) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      onChange={onChange}
      value={value}
    />
  );
};

export default InputField;
