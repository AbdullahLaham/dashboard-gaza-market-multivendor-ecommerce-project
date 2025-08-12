// src/App.jsx
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

import Home from './pages/Home';
import DashboardLayout from './components/DashboardLayout';
import Categories from './pages/categories';
import Conversations from './pages/conversations';
import Notifications from './pages/notifications';
import Orders from './pages/orders';
import Products from './pages/products';
import Stories from './pages/stories';
import Subcategories from './pages/subcategories';
import Stores from './pages/stores';
import Users from './pages/users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/categories" element={<Categories />} />
          <Route path="/dashboard/subcategories" element={<Subcategories />} />
          <Route path="/dashboard/conversations" element={<Conversations />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/stores" element={<Stores />} />
          <Route path="/dashboard/stories" element={<Stories />} />
           <Route path="/dashboard/users" element={<Users />} />
          

          <Route path="*" element={<Home />} /> 
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
