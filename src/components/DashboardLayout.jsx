// src/components/DashboardLayout.tsx
import React, {useEffect, useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  FolderPlus,
  Store,
  Package,
  ReceiptText,
  Users,
  MessageCircle,
  Bell,
  Camera,
} from 'lucide-react';
import axios from 'axios';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  
 useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/profile', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODkwYzgxNDA3OTcxMDQ3MjhmZDA3MDUiLCJlbWFpbCI6ImFib29kNDIzNUBnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzU0NDA5MDc4LCJleHAiOjE3NTQ0MDk5Nzh9.lF2wFVYWf7iZb8wi5cr9-fL1N0j3FeEIw578rrhcLMs`
          }
        });

        console.log(res.data); // Handle the response here

      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);
  // const path = 
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1e293b] border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">مرحبا بك في لوحة التحكم</h1>
          <div className="text-gray-300">👤 عبدالله اللحام</div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#0f172a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
