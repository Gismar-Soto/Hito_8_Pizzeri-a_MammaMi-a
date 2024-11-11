import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <Header />
      <main className="main-content">{children}</main> 
      <Footer />
    </div>
  );
};

export default Layout;