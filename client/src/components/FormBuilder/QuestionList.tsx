import { QuestionType } from '../../api/generated/graphqlApi';
import QuestionEditor from './QuestionEditor';

interface Question {
  type: QuestionType;
  text: string;
  options: string[];
}

interface Props {
  questions: Question[];
  updateQuestion: (index: number, updated: Partial<Question>) => void;
  removeQuestion?: (index: number) => void;
}

export default function QuestionsList({
  questions,
  updateQuestion,
  removeQuestion,
}: Props) {
  return (
    <div>
      {questions.map((question, i) => (
        <div key={i} className="relative">
          <QuestionEditor
            index={i}
            question={question}
            updateQuestion={updateQuestion}
          />
          {removeQuestion && (
            <button
              onClick={() => removeQuestion(i)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
              title="Remove question"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
