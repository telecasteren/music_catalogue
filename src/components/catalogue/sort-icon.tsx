import { SwapVertIcon } from "../utils/mui-icons";

interface SortIconProps {
  onClick: () => void;
}

export const SortButton = ({ onClick }: SortIconProps) => {
  return (
    <div id="sort-icon" onClick={onClick}>
      <SwapVertIcon fontSize="small" />
    </div>
  );
};
