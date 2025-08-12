interface Props {
  title: string;
  description: string;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
}

export default function FormHeader({
  title,
  description,
  setTitle,
  setDescription,
}: Props) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
}
