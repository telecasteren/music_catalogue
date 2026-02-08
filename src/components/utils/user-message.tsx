import Alert from "@mui/material/Alert";
import { CheckIcon, ErrorOutlineIcon } from "./mui-icons";

type UserMessageProps = {
  userMessage: string;
  isSuccess: boolean;
};

export const UserMessage = ({ userMessage, isSuccess }: UserMessageProps) => {
  const styles = {
    success: {
      bgcolor: "#dff0d8",
      mt: 4,
      width: "fit-content",
      margin: "20px auto",
    },
    error: {
      bgcolor: "#f2dede",
      color: "red !important",
      mt: 4,
      width: "fit-content",
      margin: "20px auto",
    },
  };

  return (
    <>
      {userMessage && isSuccess && (
        <Alert
          sx={styles.success}
          variant="outlined"
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
        >
          {userMessage}
        </Alert>
      )}

      {userMessage && !isSuccess && (
        <Alert
          sx={styles.error}
          variant="outlined"
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          severity="error"
        >
          {userMessage}
        </Alert>
      )}
    </>
  );
};
