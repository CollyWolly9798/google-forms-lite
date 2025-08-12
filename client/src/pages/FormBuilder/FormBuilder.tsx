import { useState } from 'react';
import {
  QuestionType,
  useCreateFormMutation,
} from '../../api/generated/graphqlApi';

interface Question {
  type: QuestionType;
  text: string;
  options: string[];
}

export default function FormBuilderPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [createForm] = useCreateFormMutation();

  const addQuestion = (type: QuestionType) => {
    setQuestions((prev) => [...prev, { type, text: '', options: [] }]);
  };

  const updateQuestionText = (index: number, text: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index].text = text;
      return copy;
    });
  };

  const saveForm = async () => {
    try {
      await createForm({
        title,
        description,
        questions: questions.map((q) => ({
          type: q.type,
          text: q.text,
          options: q.options,
        })),
      }).unwrap();
      alert('Form created!');
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Failed to create form');
    }
  };

  return (
    <div>
      <h1>Create New Form</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <div>
        <button onClick={() => addQuestion(QuestionType.Text)}>
          Add Text Question
        </button>
        <button onClick={() => addQuestion(QuestionType.Radio)}>
          Add Multiple Choice
        </button>
        <button onClick={() => addQuestion(QuestionType.Checkbox)}>
          Add Checkboxes
        </button>
        <button onClick={() => addQuestion(QuestionType.Text)}>Add Date</button>
      </div>

      {questions.map((q, i) => (
        <div key={i}>
          <input
            value={q.text}
            onChange={(e) => updateQuestionText(i, e.target.value)}
            placeholder="Question text"
          />
        </div>
      ))}

      <button onClick={saveForm}>Save Form</button>
    </div>
  );
}
