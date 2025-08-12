import { useParams } from 'react-router-dom';
import {
  useFormQuery,
  QuestionType,
  useSubmitResponseMutation,
} from '../../api/generated/graphqlApi';
import type { Question } from '../../api/generated/graphqlApi.ts';
import { useState } from 'react';
import { QuestionInput } from '../../components/Inputs/QuestionInput.tsx';

type AnswersState = Record<string, string | string[]>;

export default function FormFillPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useFormQuery({ id: id! });
  const [answers, setAnswers] = useState<AnswersState>({});
  const [submitResponse] = useSubmitResponseMutation();

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
    } catch (e) {
      console.error(e);
      alert('Failed to submit form');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading form</div>;
  if (!data?.form) return <div>Form not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{data.form.title}</h1>
      {data.form.questions.map((question: Question) => (
        <QuestionInput
          key={question.id}
          question={question}
          value={
            answers[question.id] ||
            (question.type === QuestionType.Checkbox ? [] : '')
          }
          onChange={(value) => handleChange(question.id, value)}
        />
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </div>
  );
}
