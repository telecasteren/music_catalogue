import Button from "@mui/material/Button";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton = ({ text, onClick, icon, type }: PrimaryButtonProps) => {
  return (
    <Button
      sx={{
        marginTop: "1rem",
        backgroundColor: "var(--button-primary-bg)",
        color: "var(--button-primary-text)",
        margin: "8px",
      }}
      variant="contained"
      onClick={onClick}
      startIcon={icon}
      type={type}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
