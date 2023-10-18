import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DayPick = ({ setDate, date, label }) => {
  return (
    <div>
      <label className="font-semibold">{`${label} `}</label>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        className="me-3 my-3 p-2 border rounded-md"
      />
    </div>
  );
};
