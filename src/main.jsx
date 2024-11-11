
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/UserContext';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  );