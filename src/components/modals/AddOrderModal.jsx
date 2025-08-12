import react, {useState}  from "react";


export default function AddOrderModal({ onClose, onAdd }) {
  const [customer, setCustomer] = useState("");
  const [store, setStore] = useState("");
  const [products, setProducts] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      _id: Math.random().toString(36).substring(2, 9),
      customer,
      store,
      products: products.split(",").map((p) => p.trim()),
      total: parseFloat(total),
      status: status ,
      orderDate: new Date().toISOString(),
    };

    // هنا يمكن ترسل الطلب للـ API ثم تضيفه في الواجهة
    onAdd(newOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">Add New Order</h2>

        <label className="block">
          <span className="text-gray-300">Customer Name</span>
          <input
            type="text"
            required
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-300">Store</span>
          <input
            type="text"
            required
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-300">Products (comma separated)</span>
          <input
            type="text"
            required
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            placeholder="e.g. Laptop, Mouse, Keyboard"
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-300">Total Price ($)</span>
          <input
            type="number"
            step="0.01"
            required
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-300">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </label>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Add Order
          </button>
        </div>
      </form>
    </div>
  );
}
