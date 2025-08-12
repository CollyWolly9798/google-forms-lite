import React from 'react';

interface Props {
  text: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const CheckboxInput: React.FC<Props> = ({
  text,
  options,
  value,
  onChange,
}) => {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <fieldset className="mb-4">
      <legend className="font-semibold mb-2">{text}</legend>
      {options.map((option) => (
        <label key={option} className="block mb-1">
          <input
            type="checkbox"
            value={option}
            checked={value.includes(option)}
            onChange={() => toggleOption(option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
};
