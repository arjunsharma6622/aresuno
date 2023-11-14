import React, { useState } from "react";

const SeeMore = ({ text, hiddenText }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <p className="text-sm">
      {text}
      <span
        className={`text-gray-500 ml-1 text-xs  cursor-pointer ${
          showMore ? "hidden" : ""
        }`}
        onClick={() => setShowMore(!showMore)}
      >
        ...read more
      </span>
      <span className={` ${showMore ? "" : "hidden"}`}>
        {hiddenText}
      </span>
      <span
        className={`text-gray-500 ml-1 text-xs cursor-pointer ${
          showMore ? "block" : "hidden"
        }`}
        onClick={() => setShowMore(!showMore)}
      >
        read less...
      </span>
    </p>
  );
};

export default SeeMore;
