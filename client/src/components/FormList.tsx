import { useFormsQuery } from '../api/generated/graphqlApi.ts';

export function FormsList() {
  const { data, error, isLoading } = useFormsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading forms</div>;
  if (!data || data.forms.length === 0) return <div>No forms found</div>;

  return (
    <ul>
      {data.forms.map((form) => (
        <li key={form.id}>
          {form.title} - {form.description}
        </li>
      ))}
    </ul>
  );
}
