import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useCart } from '../components/CartContext';
import { useUser } from '../components/UserContext';

const Cart = () => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart, total } = useCart();
    const { token } = useUser();
  
    return (
      <div className="container mt-4">
        <h2>Tu Carrito</h2>
        {cart.length === 0 ? (
          <p>No tienes productos en tu carrito.</p>
        ) : (
          <div>
            <ul className="list-group">
              {cart.map((item) => (
                <li key={item.id} className="cart-item list-group-item d-flex justify-content-between align-items-center">
                  <div className="cart-item-details d-flex align-items-center">
                    <img src={item.image || item.img || 'https://via.placeholder.com/150'} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info ms-3">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="mb-1">Cantidad: {item.quantity}</p>
                      <p className="mb-1">Precio total: ${(item.price * item.quantity).toLocaleString('es-ES')}</p>
                      <div className="quantity-controls d-flex align-items-center mt-2">
                        <button onClick={() => decrementQuantity(item.id)} className="btn btn-secondary btn-sm">-</button>
                        <span className="quantity-display mx-2">{item.quantity}</span>
                        <button onClick={() => incrementQuantity(item.id)} className="btn btn-primary btn-sm">+</button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-sm ms-3">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-end">
              <h4>Total a pagar: ${total.toLocaleString('es-ES')}</h4>
              <button className="btn btn-success mt-2 mb-2" disabled={!token}>
  <FontAwesomeIcon icon={faCreditCard} className="me-2" /> Pagar
</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Cart;