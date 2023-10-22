import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';

const Accordion = ({ question, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-full">
      <div
        className="flex items-center justify-between gap-4 mt-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-base font-medium text-black">{question}</p>
        { isOpen ? <FiChevronUp className="text-gray-700 w-6 h-6" /> :
        <FiChevronDown className="text-gray-700 w-6 h-6" />

}

      </div>
      {isOpen && (
        <div className="grid grid-cols-1 gap-8 mt-2" >
          <div className="max-w-full">
            <p className="text-gray-600 text-sm">{content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
