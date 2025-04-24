import React from "react";

interface SelectFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, value, onChange, options, placeholder, error }) => {
  return (
    <div className="mb-4">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default SelectField;
