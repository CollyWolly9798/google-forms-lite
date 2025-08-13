import { useParams, useNavigate } from 'react-router-dom';
import {
  useFormQuery,
  QuestionType,
  useSubmitResponseMutation,
} from '../../api/generated/graphqlApi';
import type { Question } from '../../api/generated/graphqlApi.ts';
import { useState } from 'react';
import { QuestionInput } from '../../components/Inputs/QuestionInput.tsx';
import { BackButton } from '../../components/BackButton/BackButton.tsx';

type AnswersState = Record<string, string | string[]>;

export default function FormFillPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFormQuery({ id: id! });
  const [answers, setAnswers] = useState<AnswersState>({});
  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();

  const handleChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, val]) => ({
        questionId,
        text: Array.isArray(val) ? val.join(', ') : val,
      }),
    );

    try {
      await submitResponse({ formId: id!, answers: formattedAnswers }).unwrap();
      alert('Form submitted successfully!');
      navigate('/');
    } catch (e) {
      console.error(e);
      alert('Failed to submit form. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="text-center text-gray-500 mt-10">Loading form...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <div className="text-center text-red-500 mt-10">
          <p>Error loading form</p>
          <p className="text-sm text-gray-500 mt-2">
            The form may not exist or there was a server error.
          </p>
        </div>
      </div>
    );
  }

  if (!data?.form) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <div className="text-center text-gray-500 mt-10">Form not found</div>
      </div>
    );
  }

  const form = data.form;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
        {form.description && (
          <p className="text-gray-600">{form.description}</p>
        )}
      </div>

      <div className="space-y-6">
        {form.questions.map((question: Question) => (
          <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
            <QuestionInput
              question={question}
              value={
                answers[question.id] ||
                (question.type === QuestionType.Checkbox ? [] : '')
              }
              onChange={(value) => handleChange(question.id, value)}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
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
