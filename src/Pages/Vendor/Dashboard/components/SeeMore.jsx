// import React, { useState } from "react";

// const SeeMore = ({ text, hiddenText }) => {
//   const [showMore, setShowMore] = useState(false);
//   return (
//     <p className="text-sm">
//       {text}
//       <span
//         className={`text-gray-500 ml-1 text-xs  cursor-pointer ${
//           showMore ? "hidden" : ""
//         }`}
//         onClick={() => setShowMore(!showMore)}
//       >
//         ...read more
//       </span>
//       <span className={` ${showMore ? "" : "hidden"}`}>
//         {hiddenText}
//       </span>
//       <span
//         className={`text-gray-500 ml-1 text-xs cursor-pointer ${
//           showMore ? "block" : "hidden"
//         }`}
//         onClick={() => setShowMore(!showMore)}
//       >
//         read less...
//       </span>
//     </p>
//   );
// };

// export default SeeMore;

// import React, { useState } from "react";

// const SeeMore = ({ text, maxWords }) => {
//   const [showMore, setShowMore] = useState(false);
//   const words = text.split(" ");
//   const displayText = showMore ? text : words.slice(0, maxWords).join(" ");

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//   };

//   return (
//     <p className="text-sm">
//       {displayText}
//       {words.length > maxWords && (
//         <span
//           className="text-gray-500 ml-1 text-xs cursor-pointer"
//           onClick={toggleShowMore}
//         >
//           {showMore ? " read less..." : " ...read more"}
//         </span>
//       )}
//     </p>
//   );
// };

// export default SeeMore;

import { useState } from "react";

const SeeMore = ({ text, maxWords }) => {
  const [showMore, setShowMore] = useState(false);
  const words = text.split(" ");
  const displayText = showMore ? text : words.slice(0, maxWords).join(" ");

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="whitespace-wrap">
      <p className="text-sm">
        {displayText}
        {words.length > maxWords && (
          <span
            className="text-gray-500 ml-1 text-xs cursor-pointer"
            onClick={toggleShowMore}
          >
            {showMore ? " read less..." : " ...read more"}
          </span>
        )}
      </p>
    </div>
  );
};

export default SeeMore;
