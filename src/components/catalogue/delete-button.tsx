import { DeleteIcon } from "../utils/mui-icons";

interface DeleteBtnProps {
  onClick: () => void;
}

export const DeleteBtn = ({ onClick }: DeleteBtnProps) => {
  return (
    <span className="delete-icon" onClick={onClick}>
      <DeleteIcon />
    </span>
  );
};
