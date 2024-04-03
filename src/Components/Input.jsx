import { useState } from "react";

const Input = ({ type, fieldName, inputValue, handleInputChange, name }) => {
  const handleBlur = () => {
    setFocusedField(false);
  };

  const [focusedField, setFocusedField] = useState(false);
  const [isInputPresent, setIsInputPresent] = useState(false);

  return (
    <div>
      <div className="field input-field mb-6 relative">
        <span
          className={`bg-white pointer-events-none px-2 z-10 absolute transform -translate-y-1/2 left-3 transition-all duration-75 ease-in ${
            focusedField || isInputPresent
              ? "top-0 scale-90 text-blue-500 text-sm"
              : "text-gray-400 top-1/2 text-base"
          } ${focusedField ? "text-blue-500" : "text-gray-500"}`}
        >
          {fieldName}
        </span>
        <input
          type={type}
          name={name}
          value={inputValue}
          onChange={(e) => {
            handleInputChange(e);
            setIsInputPresent(e.target.value.trim() !== ""); // Check if input is not empty
          }}
          className="rounded-md input border text-base border-gray-300 w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none focus:border-blue-500"
          onFocus={() => setFocusedField(true)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default Input;
