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
}

export default function QuestionsList({ questions, updateQuestion }: Props) {
  return (
    <div>
      {questions.map((question, i) => (
        <QuestionEditor
          key={i}
          index={i}
          question={question}
          updateQuestion={updateQuestion}
        />
      ))}
    </div>
  );
}
