import { Link } from 'react-router-dom';
import { useGetFormsQuery } from '../../api/generated/graphqlApi.ts';

const Homepage = () => {
  const { data, error, isLoading } = useGetFormsQuery();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error loading</p>;

  return (
    <div>
      <h1>Forms</h1>
      <Link to="/forms/new">
        <button>Create Form</button>
      </Link>
      <ul>
        {data?.forms.map((form) => (
          <li key={form.id}>
            <h2>{form.title}</h2>
            <p>{form.description}</p>
            <Link to={`/forms/${form.id}/fill`}>Field form</Link>

            <Link to={`/forms/${form.id}/responses`}>Check answers</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
