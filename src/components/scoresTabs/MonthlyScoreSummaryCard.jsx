import React from "react";

const DateSummary = ({ date, score }) => {
  // If there's no date, return an empty div to serve as a placeholder in the grid
  if (date === undefined) {
    return <div className="h-min"></div>; // Apply any necessary styles for the empty box here
  }

  // If there is a date, return the full content
  return (
    <div className="h-min bg-bg-main-transparent glassEffectNoShadow justify-center items-center text-center flex flex-col gap-2 p-2 rounded-lg">
        <p className="text-text-colour-secondary m-0 text-base">{date && new Date(date).getDate()}</p>
        <h2 className="veryhigh-score-text m-0 text-3xl">{score !== null ? score : "-"}</h2>
        <p className='text-text-colour-tertiary m-0 text-xs'>/100</p>
    </div>
  );
};


  export default DateSummary;