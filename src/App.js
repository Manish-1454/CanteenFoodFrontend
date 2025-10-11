import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodMenu from "./Admin/FoodMenu";
import MyOrders from "./Admin/MyOrders";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLayout from "./Admin/AdminLayout";
import AddFood from "./Admin/AddFood";
import Dashboard from "./Admin/Dashboard";
import UserLayout from "./users/UserLayout";
import UserHome from "./users/UserHome";
import UserControl from "./Admin/UserControl";
import Contact from "./Admin/Contact";
import Home from "./pages/DefaultPage";
import OrderPage from "./users/OrderPage";
import OrderHistoryPage from "./users/OrderHistoryPage"
import UserContact from "./users/UserContact";
export default function App() {
  return (
   <BrowserRouter>
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
 
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Admin routes */}
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/foodmenu" element={<FoodMenu />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/add-item" element={<AddFood />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user-control" element={<UserControl />} />
      <Route path="/contact" element={<Contact />} />
    </Route>

    {/* User routes */}
    <Route element={<UserLayout />}>
      <Route path="/user/dashboard" element={<UserHome />} />
      <Route path="/user/order" element={<OrderPage />} />
      <Route path="/user/history" element={<OrderHistoryPage />} />
      <Route path="/user/contact-us" element={<UserContact />} />
    </Route>

    {/* Fallback */}
    <Route
      path="*"
      element={<h3 className="text-center mt-5">404 - Page Not Found</h3>}
    />
  </Routes>
</BrowserRouter>

  );
}
