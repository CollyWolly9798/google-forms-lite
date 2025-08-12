import type { ChangeEvent } from 'react';
import { QuestionType } from '../../api/generated/graphqlApi';

interface Question {
  type: QuestionType;
  text: string;
  options: string[];
}

interface Props {
  index: number;
  question: Question;
  updateQuestion: (index: number, updated: Partial<Question>) => void;
}

export default function QuestionEditor({
  index,
  question,
  updateQuestion,
}: Props) {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateQuestion(index, { text: e.target.value });
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateQuestion(index, { type: e.target.value as QuestionType });
  };

  const addOption = () => {
    updateQuestion(index, { options: [...question.options, ''] });
  };

  const updateOption = (optionIndex: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = value;
    updateQuestion(index, { options: newOptions });
  };

  const removeOption = (optionIndex: number) => {
    const newOptions = question.options.filter((_, i) => i !== optionIndex);
    updateQuestion(index, { options: newOptions });
  };

  return (
    <div className="border p-4 rounded mb-4">
      <div className="mb-2 flex items-center gap-4">
        <input
          type="text"
          placeholder="Question text"
          value={question.text}
          onChange={handleTextChange}
          className="flex-grow p-2 border border-gray-300 rounded"
        />
        <select
          value={question.type}
          onChange={handleTypeChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value={QuestionType.Text}>Text</option>
          <option value={QuestionType.Radio}>Multiple Choice</option>
          <option value={QuestionType.Checkbox}>Checkboxes</option>
        </select>
      </div>

      {(question.type === QuestionType.Radio ||
        question.type === QuestionType.Checkbox) && (
        <div className="ml-4">
          <h4 className="font-semibold mb-2">Options:</h4>
          {question.options.map((option, i) => (
            <div key={i} className="flex items-center mb-2 gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(i, e.target.value)}
                className="flex-grow p-1 border border-gray-300 rounded"
              />
              <button
                onClick={() => removeOption(i)}
                className="text-red-500 hover:text-red-700"
                type="button"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={addOption}
            className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            type="button"
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
}
