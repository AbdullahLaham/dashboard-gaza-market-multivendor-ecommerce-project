
import { useState, useEffect } from "react";
import { ShoppingCart, Store, Package, Bell } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

export default function Home() {
  // Fake Stats Data
  const stats = [
    { title: "Total Orders", value: 1200, icon: <ShoppingCart className="text-blue-400 w-6 h-6" /> },
    { title: "Total Stores", value: 85, icon: <Store className="text-green-400 w-6 h-6" /> },
    { title: "Total Products", value: 5400, icon: <Package className="text-yellow-400 w-6 h-6" /> },
    { title: "Notifications", value: 14, icon: <Bell className="text-red-400 w-6 h-6" /> },
  ];

  // Fake Sales Data
  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 800 },
    { month: "Mar", sales: 650 },
    { month: "Apr", sales: 900 },
    { month: "May", sales: 700 },
    { month: "Jun", sales: 1100 },
  ];

  // Fake Orders Data
  const recentOrders = [
    { id: "1", customer: "Ali Ahmad", total: "$250", status: "Pending" },
    { id: "2", customer: "Sara Khaled", total: "$180", status: "Shipped" },
    { id: "3", customer: "Omar Youssef", total: "$320", status: "Completed" },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-800 p-5 rounded-xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
        {/* <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer> */}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700">
                <td className="py-2">{order.customer}</td>
                <td className="py-2">{order.total}</td>
                <td className={`py-2 ${order.status === "Pending" ? "text-yellow-400" : order.status === "Shipped" ? "text-blue-400" : "text-green-400"}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
