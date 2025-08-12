// src/pages/Register.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name: fullName,
        email,
        password
      });
      console.log('User created:', response.data);
      // يمكنك توجيه المستخدم إلى صفحة تسجيل الدخول أو عرض رسالة نجاح
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      // عرض رسالة خطأ للمستخدم حسب الحاجة
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">إنشاء حساب</h2>
        <form className="space-y-4" onSubmit={createUser}>
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            إنشاء حساب
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{' '}
          <Link to="/signin" className="text-green-500 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
