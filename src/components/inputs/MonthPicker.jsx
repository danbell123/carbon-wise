import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthPicker = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Derive the selected month's name from the selected date prop.
  const selectedMonthName = selected ? months[selected.getMonth()] : "";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // Optionally adjust the selected date here if needed.
    // This replicates onCalendarOpen. Assuming selected is a Date object.
    if (!isOpen) {
      const adjustedDate = new Date(selected.getFullYear(), selected.getMonth(), 1);
      onChange(adjustedDate);
    }
  };

  const handleMonthSelect = (monthIndex) => {
    const newSelectedDate = new Date(selected.getFullYear(), monthIndex, 1);
    onChange(newSelectedDate); // Propagate the new date up
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative">
      <motion.div
        className="cursor-pointer p-2 bg-blue-500 text-white rounded-md"
        onClick={toggleDropdown}
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {selectedMonthName || "Select a month"}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
          >
            {months.map((month, index) => (
              <div
                key={month}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedMonthName === month ? "bg-blue-100" : ""}`}
                onClick={() => handleMonthSelect(index)}
              >
                {month}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MonthPicker;
