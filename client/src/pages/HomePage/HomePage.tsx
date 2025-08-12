import { Link } from 'react-router-dom';
import { useGetFormsQuery } from '../../api/generated/graphqlApi.ts';

const Homepage = () => {
  const { data, error, isLoading } = useGetFormsQuery();

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Error loading</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Forms</h1>
      <div className="flex justify-center mb-8">
        <Link to="/forms/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded shadow-md transition duration-300">
            Create Form
          </button>
        </Link>
      </div>
      <ul className="space-y-6">
        {data?.forms.map((form) => (
          <li
            key={form.id}
            className="border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{form.title}</h2>
            <p className="text-gray-600 mb-4">{form.description}</p>
            <div className="flex gap-4">
              <Link
                to={`/forms/${form.id}/fill`}
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
              >
                Fill form
              </Link>

              <Link
                to={`/forms/${form.id}/responses`}
                className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition"
              >
                Check answers
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
