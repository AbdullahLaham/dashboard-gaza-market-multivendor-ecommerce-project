import React from 'react'
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
  ShoppingCart,
  BookOpen,
  LayoutDashboardIcon,
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({isOpen, setIsOpen}) => {

    const location = useLocation();
    const path1 = location?.pathname?.split('/');
    const path = path1.filter(Boolean).length > 1 ? path1.filter(Boolean).pop() : '/';


    // console.log('pppppppppppppppppppppppppppp', path?.split('/').filter(Boolean).pop())


const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboardIcon size={20} />, path: "" },
  { name: "Categories", icon: <FolderKanban size={20} />, path: "categories" },
  { name: "Subcategories", icon: <FolderPlus size={20} />, path: "subcategories" },
  { name: "Stores", icon: <Store size={20} />, path: "stores" },
  { name: "Products", icon: <Package size={20} />, path: "products" },
  { name: "Orders", icon: <ShoppingCart size={20} />, path: "orders" },
  { name: "Notifications", icon: <Bell size={20} />, path: "notifications" },
  { name: "Stories", icon: <BookOpen size={20} />, path: "stories" },
  { name: "Users", icon: <Users size={20} />, path: "users" },
];
    
  return (
    <div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white  pt-3 pb-10 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block`}>
        <h2 className="text-2xl font-bold tracking-wide p-5 py-2">لوحة التحكم </h2>
        {/* <nav className="flex flex-col gap-3 mt-10">
          <Link to="/" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == '/' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <LayoutDashboard size={20} /> الرئيسية
          </Link>
          <Link  to="/dashboard/categories" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'categories' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <FolderKanban size={20} /> الفئات
          </Link>
          <Link to="/dashboard/subcategories" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'subcategories' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <FolderPlus size={20} /> الفئات الفرعية
          </Link>
          <Link to="/dashboard/stores" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'stores' ? 'bg-gray-300 text-gray-900 ' : ''}`}>
            <Store size={20} /> المتاجر
          </Link>
          <Link to="/dashboard/products" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'products' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <Package size={20} /> المنتجات
          </Link>
          <Link to="/dashboard/orders" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'orders' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <ReceiptText size={20} /> الطلبات
          </Link>
          <Link to="/dashboard/users" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'users' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <Users size={20} /> المستخدمين
          </Link>
          <Link to="/dashboard/conversations" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'conversations' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <MessageCircle size={20} /> المحادثات
          </Link>
          <Link to="/dashboard/notifications" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'notifications' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <Bell size={20} /> الإشعارات
          </Link>
          <Link to="/dashboard/stories" className={`flex items-center gap-3 hover:text-blue-400 transition-colors p-5 px-5 py-4 rounded-lg text-gray-200 font-bold ${path == 'stories' ? 'bg-gray-300 text-gray-900' : ''}`}>
            <Camera size={20} /> القصص
          </Link>
        </nav> */}
        {menuItems.map((item) => {
          return (
            <NavLink
            key={item.name}
            to={`/dashboard/${item.path}`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-5 px-3 py-4 rounded-md transition ${
                path == item.path ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
          )
        })}
      </aside>
    </div>
  )
}

export default Sidebar
