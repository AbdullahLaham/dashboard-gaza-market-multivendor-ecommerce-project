import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Plus } from "lucide-react";

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    setSubcategories([
      { id: 1, name: "Espresso", category: "Coffee" },
      { id: 2, name: "Green Tea", category: "Tea" },
      { id: 3, name: "Orange Juice", category: "Juices" },
    ]);
  }, []);

  const fetchSubcategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:5000/subcategories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubcategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSubcategory = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/subcategories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubcategories(subcategories.filter((sub) => sub.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateSubcategory = (id) => {
    alert(`Update subcategory with id: ${id}`);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subcategories</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          <Plus size={18} /> Add Subcategory
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-gray-700 hover:bg-gray-750"
              >
                <td className="py-3 px-4">{sub.name}</td>
                <td className="py-3 px-4">{sub.category}</td>
                <td className="py-3 px-4 flex gap-3">
                  <button
                    onClick={() => updateSubcategory(sub.id)}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteSubcategory(sub.id)}
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
