import { QuestionType } from '../../api/generated/graphqlApi';

interface Props {
  addQuestion: (type: QuestionType) => void;
}

export default function AddQuestionButtons({ addQuestion }: Props) {
  return (
    <div className="mb-6 flex gap-4">
      <button
        onClick={() => addQuestion(QuestionType.Text)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Add Text Question
      </button>
      <button
        onClick={() => addQuestion(QuestionType.Radio)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Multiple Choice
      </button>
      <button
        onClick={() => addQuestion(QuestionType.Checkbox)}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
      >
        Add Checkboxes
      </button>
    </div>
  );
}
