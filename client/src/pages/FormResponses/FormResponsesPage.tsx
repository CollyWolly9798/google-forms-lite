import { useParams } from 'react-router-dom';
import {
  useFormQuery,
  useResponsesQuery,
} from '../../api/generated/graphqlApi';

export default function FormResponsesPage() {
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

  if (formLoading || responsesLoading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (formError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading form data
      </div>
    );
  if (responsesError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading responses
      </div>
    );
  if (!formData?.form)
    return <div className="text-center mt-10 text-red-500">Form not found</div>;
  if (!responsesData || responsesData.responses.length === 0)
    return (
      <div className="text-center mt-10 text-gray-600">No responses yet</div>
    );

  const { form } = formData;
  const { responses } = responsesData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Responses for: {form.title}
      </h1>

      <div className="space-y-6">
        {responses.map((response) => (
          <div
            key={response.id}
            className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold mb-3">Response ID: {response.id}</h3>
            <ul className="list-disc list-inside space-y-1">
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
    </div>
  );
}
