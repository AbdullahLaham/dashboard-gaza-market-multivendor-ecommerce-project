import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Plus } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // fake data initially
  useEffect(() => {
    setCategories([
      { id: 1, name: "Coffee", description: "All types of coffee" },
      { id: 2, name: "Tea", description: "Best tea varieties" },
      { id: 3, name: "Juices", description: "Fresh and healthy juices" },
    ]);
  }, []);

  // fetch from API
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:5000/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateCategory = (id) => {
    alert(`Update category with id: ${id}`);
    // navigate to update page or open modal
  };

  

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-b border-gray-700 hover:bg-gray-750"
              >
                <td className="py-3 px-4">{cat.name}</td>
                <td className="py-3 px-4">{cat.description}</td>
                <td className="py-3 px-4 flex gap-3">
                  <button
                    onClick={() => updateCategory(cat.id)}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
