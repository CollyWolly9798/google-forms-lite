import { useParams } from 'react-router-dom';
import {
  type AnswerInput,
  type Question,
  QuestionType,
  useFormQuery,
  useSubmitResponseMutation,
} from '../../api/generated/graphqlApi';
import { useState } from 'react';

type AnswersState = Record<string, string>;

export default function FormFillPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useFormQuery({ id: id! });
  const [answers, setAnswers] = useState<AnswersState>({});
  const [submitResponse] = useSubmitResponseMutation();

  const handleSubmit = async () => {
    const formattedAnswers: AnswerInput[] = Object.entries(answers).map(
      ([questionId, text]) => ({
        questionId,
        text: String(text),
      }),
    );

    try {
      await submitResponse({
        formId: id!,
        answers: formattedAnswers,
      }).unwrap();
      alert('Form submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit form');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!data?.form) return <div>Form not found</div>;

  return (
    <div>
      <h1>{data.form.title}</h1>
      {data.form.questions.map((q: Question) => (
        <div key={q.id}>
          <p>{q.text}</p>
          {q.type === QuestionType.Text && (
            <input
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [q.id]: e.target.value,
                }))
              }
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
