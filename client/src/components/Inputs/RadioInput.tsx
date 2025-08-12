import React from 'react';

interface Props {
  questionId: string;
  text: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const RadioInput: React.FC<Props> = ({
  questionId,
  text,
  options,
  value,
  onChange,
}) => (
  <fieldset className="mb-4">
    <legend className="font-semibold mb-2">{text}</legend>
    {options.map((option) => (
      <label key={option} className="block mb-1">
        <input
          type="radio"
          name={questionId}
          value={option}
          checked={value === option}
          onChange={() => onChange(option)}
          className="mr-2"
        />
        {option}
      </label>
    ))}
  </fieldset>
);
