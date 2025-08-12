import { Link } from 'react-router-dom';
import { useFormsQuery } from '../../api/generated/graphqlApi.ts';

export interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  const { data, error, isLoading } = useFormsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading forms</div>;

  return (
    <div>
      <h1>All Forms</h1>
      <Link to="/forms/new">Create New Form</Link>

      {data?.forms.length === 0 && <p>No forms found</p>}

      <ul>
        {data?.forms.map((form) => (
          <li key={form.id}>
            <h3>{form.title}</h3>
            <p>{form.description}</p>
            <Link to={`/forms/${form.id}/fill`}>View Form</Link>
            <Link to={`/forms/${form.id}/responses`}>View Responses</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
