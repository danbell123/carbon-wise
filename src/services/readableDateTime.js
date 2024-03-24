import { formatDistanceToNow, parseISO, isValid } from 'date-fns';

const formatDateToNow = (dateString) => {
  console.log("qw",dateString)

  // Check for "Loading..." or falsy values like "", null, or undefined
  if (!dateString || dateString === "Loading...") return '';

  const date = parseISO(dateString);

  // Check if the parsed date is valid before formatting
  if (!isValid(date)) {
    console.error(`Invalid date: ${dateString}`);
    return 'Invalid date';
  }

  return formatDistanceToNow(date, { addSuffix: true });
};

export default formatDateToNow;
