import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-green-600 text-white font-bold py-2 rounded-md transition duration-300 ease-in-out hover:bg-green-700 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
