import { useState } from "react";

const InputBx = ({ type, required, placeholder, value, onChange, name }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <span
        className={`bg-white pointer-events-none px-2 z-10  absolute transform -translate-y-1/2 left-3  transition-all duration-[150ms]  ease-in ${
          isFocused || value
            ? "top-0 scale-90 text-blue-500 text-sm"
            : "text-gray-400 top-1/2  text-base"
        } ${isFocused ? "text-blue-500" : "text-gray-500"}`}
        onFocus={() => setIsFocused(true)}
        onBeforeInput={() => setIsFocused(false)}
      >
        {placeholder}
      </span>

      <input
        className={`rounded-md input border border-gray-300 w-full py-3 px-3 text-gray-600 leading-tight focus:outline-none focus:border-blue-500`}
        id={type}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default InputBx;
