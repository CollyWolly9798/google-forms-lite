import { QuestionType } from '../api/generated/graphqlApi.ts';
import OptionsList from './OptionsList.tsx';

interface Question {
  type: QuestionType;
  text: string;
  options: string[];
}

interface Props {
  question: Question;
  onChange: (updatedQuestion: Question) => void;
}

export default function QuestionItem({ question, onChange }: Props) {
  const updateText = (text: string) => {
    onChange({ ...question, text });
  };

  const updateOptions = (options: string[]) => {
    onChange({ ...question, options });
  };

  return (
    <div className="border p-4 rounded space-y-3 bg-gray-50">
      <input
        className="w-full p-2 border rounded"
        value={question.text}
        onChange={(e) => updateText(e.target.value)}
        placeholder="Question text"
      />

      {(question.type === QuestionType.Radio ||
        question.type === QuestionType.Checkbox) && (
        <OptionsList options={question.options} onChange={updateOptions} />
      )}
    </div>
  );
}
