
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '@/components/chat/Chatbot';
import AdminDataSync from '@/components/admin/AdminDataSync';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <AdminDataSync />
    </div>
  );
};

export default Layout;
