import React from "react";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";

interface FormGroupProps {
  label: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder: string;
  error?: string;
  options?: string[];
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  options,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {label} <span className="text-red-500">*</span>
      </label>
      {options ? (
        <SelectField
          id={id}
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          error={error}
        />
      ) : (
        <InputField
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          type="text"
        />
      )}
    </div>
  );
};

export default FormGroup;
