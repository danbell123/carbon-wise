import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

function CustomMonthInput({ value, onChange, dateFormat, showMonthYearPicker, dropdownMode, onCalendarOpen }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggleCalendar = () => {
    if (open) {
      setTimeout(() => setOpen(false), 300);
    } else {
      setOpen(true);
    }
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} className="flex flex-row p-0 items-center text-lg justify-between bg-transparent text-text-colour-primary rounded-xl">
      {value}
      <motion.span
        className="material-symbols-outlined"
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        expand_more
      </motion.span>
    </button>
  ));

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat={dateFormat}
      showMonthYearPicker={showMonthYearPicker}
      dropdownMode={dropdownMode}
      customInput={<CustomInput ref={ref} onClick={toggleCalendar} />}
      open={open}
      onCalendarClose={() => setOpen(false)}
      onCalendarOpen={() => setOpen(true)}
    />
  );
}

export default CustomMonthInput;
