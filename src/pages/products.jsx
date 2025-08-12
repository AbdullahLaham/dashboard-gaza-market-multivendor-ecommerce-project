import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddProductModal from "../components/modals/AddProductModal";

// interface Product {
//   _id: string;
//   name: string;
//   description?: string;
//   price: number;
//   stock: number;
//   category: string;
//   subCategory?: string;
//   vendor: string;
//   store: string;
//   images: string[];
// }

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "Coffee Beans",
      description: "Premium Arabica coffee beans",
      price: 25,
      stock: 120,
      category: "cat123",
      subCategory: "subcat456",
      vendor: "vendor001",
      store: "store001",
      images: ["https://via.placeholder.com/100"],
    },
    {
      _id: "2",
      name: "Espresso Machine",
      description: "Professional espresso maker",
      price: 350,
      stock: 10,
      category: "cat456",
      subCategory: "",
      vendor: "vendor002",
      store: "store002",
      images: ["https://via.placeholder.com/100"],
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const authToken = "YOUR_AUTH_TOKEN";

  // Fetch Products from API
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://your-api.com/products", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Create Product
  const createProduct = async (newProduct) => {
    try {
      const res = await axios.post("https://your-api.com/products", newProduct, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setProducts((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Update Product
  const updateProduct = async (id, updatedData) => {
    try {
      const res = await axios.put(`https://your-api.com/products/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setProducts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://your-api.com/products/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // useEffect(() => {
  //   fetchProducts(); // Uncomment to fetch real data
  // }, []);

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* جدول المنتجات */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Vendor</th>
              <th className="py-3 px-4 text-left">Store</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-gray-700">
                <td className="py-3 px-4">
                  <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-3 px-4">{p.name}</td>
                <td className="py-3 px-4">${p.price}</td>
                <td className="py-3 px-4">{p.stock}</td>
                <td className="py-3 px-4">{p.category}</td>
                <td className="py-3 px-4">{p.vendor}</td>
                <td className="py-3 px-4">{p.store}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                  <button
                    onClick={() => updateProduct(p._id, { name: p.name + " (Updated)" })}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* مودال إضافة المنتج */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={createProduct}
      />
    </div>
  );
}
