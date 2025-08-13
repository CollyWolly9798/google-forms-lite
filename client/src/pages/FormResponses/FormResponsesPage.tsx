import { useParams } from 'react-router-dom';
import {
  useFormQuery,
  useResponsesQuery,
} from '../../api/generated/graphqlApi';
import { BackButton } from '../../components/BackButton/BackButton.tsx';

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

  if (formLoading || responsesLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <div className="text-center mt-10 text-gray-500">Loading...</div>
      </div>
    );
  }

  if (formError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <div className="text-center mt-10 text-red-500">
          <p>Error loading form data</p>
          <p className="text-sm text-gray-500 mt-2">
            The form may not exist or there was a server error.
          </p>
        </div>
      </div>
    );
  }

  if (responsesError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <div className="text-center mt-10 text-red-500">
          <p>Error loading responses</p>
          <p className="text-sm text-gray-500 mt-2">
            There was an error loading the form responses.
          </p>
        </div>
      </div>
    );
  }

  if (!formData?.form) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <div className="text-center mt-10 text-red-500">Form not found</div>
      </div>
    );
  }

  const { form } = formData;
  const responses = responsesData?.responses || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <BackButton to="/" label="Back to Forms" className="mb-4" />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-2">Form Responses</h1>
          <h2 className="text-xl text-gray-700 mb-2">{form.title}</h2>
          {form.description && (
            <p className="text-gray-600 mb-4">{form.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Total Questions: {form.questions.length}</span>
            <span>Total Responses: {responses.length}</span>
          </div>
        </div>
      </div>

      {responses.length === 0 ? (
        <div className="text-center mt-10">
          <div className="bg-gray-50 rounded-lg p-8">
            <p className="text-lg text-gray-600 mb-2">No responses yet</p>
            <p className="text-sm text-gray-500">
              Share your form to start collecting responses!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            All Responses ({responses.length})
          </h3>

          {responses.map((response, index) => (
            <div
              key={response.id}
              className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">
                  Response #{index + 1}
                </h4>
                <span className="text-sm text-gray-500">ID: {response.id}</span>
              </div>

              <div className="space-y-3">
                {response.answers.map((answer) => {
                  const question = form.questions.find(
                    (q) => q.id === answer.questionId,
                  );
                  return (
                    <div
                      key={answer.questionId}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <p className="font-medium text-gray-800 mb-1">
                        {question?.text || 'Unknown Question'}
                      </p>
                      <p className="text-gray-600 bg-gray-50 p-2 rounded">
                        {answer.text || (
                          <em className="text-gray-400">No answer provided</em>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
