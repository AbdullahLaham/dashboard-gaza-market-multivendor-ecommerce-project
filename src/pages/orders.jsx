import React, { useState, useEffect } from "react";
import axios from "axios";
import AddOrderModal from "../components/modals/AddOrderModal"
const fakeOrders = [
  {
    _id: "1",
    customer: "John Doe",
    store: "Tech Store",
    products: ["Laptop", "Mouse"],
    total: 1250,
    status: "Pending",
    orderDate: new Date().toISOString(),
  },
  {
    _id: "2",
    customer: "Jane Smith",
    store: "Fashion Store",
    products: ["T-shirt", "Jeans"],
    total: 80,
    status: "Shipped",
    orderDate: new Date().toISOString(),
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(fakeOrders);
  const [showModal, setShowModal] = useState(false);

  // Fetch real data (replace url and headers with your actual)
  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    }
    fetchOrders();
  }, []);

  function handleDelete(id) {
    // implement delete logic here
    setOrders((prev) => prev.filter((order) => order._id !== id));
  }

  function handleUpdate(updatedOrder) {
    // implement update logic here
    setOrders((prev) =>
      prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Orders</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          Add New Order
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-700 rounded">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3 border border-gray-700">Customer</th>
              <th className="p-3 border border-gray-700">Store</th>
              <th className="p-3 border border-gray-700">Products</th>
              <th className="p-3 border border-gray-700">Total ($)</th>
              <th className="p-3 border border-gray-700">Status</th>
              <th className="p-3 border border-gray-700">Order Date</th>
              <th className="p-3 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-800">
                <td className="p-3 border border-gray-700">{order.customer}</td>
                <td className="p-3 border border-gray-700">{order.store}</td>
                <td className="p-3 border border-gray-700">
                  {order.products.join(", ")}
                </td>
                <td className="p-3 border border-gray-700">{order.total.toFixed(2)}</td>
                <td className="p-3 border border-gray-700">{order.status}</td>
                <td className="p-3 border border-gray-700">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="p-3 border border-gray-700 space-x-2">
                  <button
                    onClick={() => alert("Update feature to implement")}
                    className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddOrderModal
          onClose={() => setShowModal(false)}
          onAdd={(newOrder) => {
            setOrders((prev) => [newOrder, ...prev]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
