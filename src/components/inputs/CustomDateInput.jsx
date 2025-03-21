import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

function CustomDateInput({ value, onChange, showTimeSelect, dateFormat }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleOpenCalendar = () => {
    setOpen(!open);
  };

  const iconVariants = {
    opened: { rotate: 180 },
    closed: { rotate: 0 }
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} className="flex flex-row p-0 items-center text-base lg:text-lg justify-between bg-transparent text-text-colour-primary rounded-xl">
      {value}
      <motion.span
        className="material-symbols-outlined"
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        variants={iconVariants}
      >
        expand_more
      </motion.span>
    </button>
  ));

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      onChangeRaw={(event) => event.preventDefault()}
      customInput={<CustomInput ref={ref} onClick={handleOpenCalendar} />}
      open={open}
      onCalendarClose={() => setOpen(false)}
      onCalendarOpen={() => setOpen(true)}
      showTimeSelect={showTimeSelect}
      dateFormat={dateFormat || "Pp"}
    />
  );
}

export default CustomDateInput;
