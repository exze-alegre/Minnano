import React, { useState, useRef } from "react";

const NumberForm = () => {
  const [values, setValues] = useState(Array(6).fill(""));

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (e, index) => {
    const newValues = [...values];
    const value = e.target.value.slice(0, 1); // Ensure only 1 digit is entered
    newValues[index] = value;
    setValues(newValues);

    // Focus the next input if the current one is filled and not the last input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && values[index] === "") {
      // Focus on the previous input if backspace is pressed and the current input is empty
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <div className="flex justify-center text-cyan-500 items-center">
      <form className="flex space-x-2">
        {values.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={inputRefs[index]}
            className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        ))}
      </form>
    </div>
  );
};

export default NumberForm;
