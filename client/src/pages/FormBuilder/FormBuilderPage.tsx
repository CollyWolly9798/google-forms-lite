import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  QuestionType,
  useCreateFormMutation,
} from '../../api/generated/graphqlApi';
import FormHeader from '../../components/FormBuilder/FormHeader.tsx';
import AddQuestionButtons from '../../components/FormBuilder/AddQuestionButtons.tsx';
import QuestionsList from '../../components/FormBuilder/QuestionList.tsx';
import { BackButton } from '../../components/BackButton/BackButton.tsx';

export interface Question {
  type: QuestionType;
  text: string;
  options: string[];
}

export default function FormBuilderPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [createForm, { isLoading }] = useCreateFormMutation();
  const navigate = useNavigate();

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

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const saveForm = async () => {
    if (!title.trim()) {
      alert('Please enter a form title');
      return;
    }

    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    try {
      await createForm({ title, description, questions }).unwrap();
      alert('Form created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Failed to create form. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <h1 className="text-3xl font-bold">Create New Form</h1>
      </div>

      <FormHeader
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
      />

      <AddQuestionButtons addQuestion={addQuestion} />

      <QuestionsList
        questions={questions}
        updateQuestion={updateQuestion}
        removeQuestion={removeQuestion}
      />

      {questions.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No questions yet. Add your first question above!</p>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={saveForm}
          disabled={isLoading || !title.trim() || questions.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Form'}
        </button>

        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
