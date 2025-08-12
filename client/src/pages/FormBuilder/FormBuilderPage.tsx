import { useState } from 'react';
import {
  QuestionType,
  useCreateFormMutation,
} from '../../api/generated/graphqlApi';
import FormHeader from '../../components/FormBuilder/FormHeader.tsx';
import AddQuestionButtons from '../../components/FormBuilder/AddQuestionButtons.tsx';
import QuestionsList from '../../components/FormBuilder/QuestionList.tsx';

export interface Question {
  type: QuestionType;
  text: string;
  options: string[];
}

export default function FormBuilderPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [createForm] = useCreateFormMutation();

  const addQuestion = (type: QuestionType) => {
    setQuestions((prev) => [...prev, { type, text: '', options: [] }]);
  };

  const updateQuestion = (index: number, updated: Partial<Question>) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updated };
      return copy;
    });
  };

  const saveForm = async () => {
    try {
      await createForm({ title, description, questions }).unwrap();
      alert('Form created!');
      setTitle('');
      setDescription('');
      setQuestions([]);
    } catch {
      alert('Failed to create form');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Form</h1>
      <FormHeader
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
      />
      <AddQuestionButtons addQuestion={addQuestion} />
      <QuestionsList questions={questions} updateQuestion={updateQuestion} />
      <button
        onClick={saveForm}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Form
      </button>
    </div>
  );
}
