import React from 'react';

interface Props {
  questionId: string;
  text: string;
  value: string;
  onChange: (value: string) => void;
}

export const TextInput: React.FC<Props> = ({
  questionId,
  text,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label htmlFor={questionId} className="block mb-1 font-semibold">
      {text}
    </label>
    <input
      id={questionId}
      type="text"
      className="w-full p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
