export default function AddItemModal({ isOpen, onClose, onSubmit, fields }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    fields.forEach((f) => {
      formData[f] = e.target[f].value;
    });
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map((f) => (
            <input
              key={f}
              name={f}
              placeholder={f}
              className="w-full p-2 rounded bg-gray-800 text-gray-200"
            />
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-700 px-3 py-1 rounded">Cancel</button>
            <button type="submit" className="bg-green-600 px-3 py-1 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
