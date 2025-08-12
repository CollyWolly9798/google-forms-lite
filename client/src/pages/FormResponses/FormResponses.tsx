import { useParams } from 'react-router-dom';
import {
  useFormQuery,
  useResponsesQuery,
} from '../../api/generated/graphqlApi';

export default function FormResponses() {
  const { id } = useParams<{ id: string }>();

  const {
    data: formData,
    error: formError,
    isLoading: formLoading,
  } = useFormQuery({ id: id! });

  const {
    data: responsesData,
    error: responsesError,
    isLoading: responsesLoading,
  } = useResponsesQuery({ formId: id! });

  if (formLoading || responsesLoading) return <div>Loading...</div>;
  if (formError) return <div>Error loading form data</div>;
  if (responsesError) return <div>Error loading responses</div>;
  if (!formData?.form) return <div>Form not found</div>;
  if (!responsesData || responsesData.responses.length === 0)
    return <div>No responses yet</div>;

  const { form } = formData;
  const { responses } = responsesData;

  return (
    <div>
      <h1>Responses for: {form.title}</h1>
      {responses.map((response) => (
        <div
          key={response.id}
          style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
        >
          <h3>Response ID: {response.id}</h3>
          <ul>
            {response.answers.map((answer) => {
              const question = form.questions.find(
                (q) => q.id === answer.questionId,
              );
              return (
                <li key={answer.questionId}>
                  <strong>{question?.text || 'Unknown Question'}:</strong>{' '}
                  {answer.text}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
