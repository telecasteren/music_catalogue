import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface DatePickerElementProps {
  value: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs | null) => void;
}

export const DatePickerElement = ({
  value,
  onChange,
}: DatePickerElementProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Release Year"
        views={["year"]}
        value={value}
        onChange={onChange}
        minDate={dayjs("1800")}
        maxDate={dayjs(String(new Date().getFullYear()))}
      />
    </LocalizationProvider>
  );
};
