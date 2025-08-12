export default function TableView({ data, onEdit, onDelete }) {
  return (
    <table className="min-w-full bg-gray-900 text-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-800">
        <tr>
          {Object.keys(data[0] || {}).map((key) => (
            <th key={key} className="p-3 text-left">{key}</th>
          ))}
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b border-gray-700 hover:bg-gray-800">
            {Object.values(row).map((val, idx) => (
              <td key={idx} className="p-3">{val}</td>
            ))}
            <td className="p-3 flex gap-2">
              <button onClick={() => onEdit(row)} className="bg-blue-600 px-3 py-1 rounded">Edit</button>
              <button onClick={() => onDelete(row.id)} className="bg-red-600 px-3 py-1 rounded">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
