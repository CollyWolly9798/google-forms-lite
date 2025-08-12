interface Props {
  options: string[];
  onChange: (options: string[]) => void;
}

export default function OptionsList({ options, onChange }: Props) {
  const addOption = () => {
    onChange([...options, '']);
  };

  const updateOption = (index: number, value: string) => {
    const copy = [...options];
    copy[index] = value;
    onChange(copy);
  };

  const removeOption = (index: number) => {
    const copy = [...options];
    copy.splice(index, 1);
    onChange(copy);
  };

  return (
    <div className="space-y-2">
      <p className="font-semibold">Options:</p>
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            className="flex-grow p-1 border rounded"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => removeOption(index)}
            type="button"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="text-blue-600 hover:underline"
        onClick={addOption}
        type="button"
      >
        + Add Option
      </button>
    </div>
  );
}
