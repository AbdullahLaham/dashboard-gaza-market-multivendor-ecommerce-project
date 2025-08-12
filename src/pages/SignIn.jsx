// src/pages/SignIn.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function SignIn() {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const loginUser = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        // name: fullName,
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">تسجيل الدخول</h2>
        <form className="space-y-4" onSubmit={loginUser}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="البريد الإلكتروني"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="كلمة المرور"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            دخول
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ليس لديك حساب؟{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}
