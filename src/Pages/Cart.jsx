import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart, total } = useCart();
    const { token } = useUser();

    const handleCheckout = async () => {
        if (token) {
            try {
                const response = await fetch('/api/checkouts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ cart })
                });
                
                if (response.ok) {
                    alert("Compra realizada con éxito");
                } else {
                    throw new Error("Error al procesar la compra");
                }
            } catch (error) {
                console.error("Error en el checkout:", error);
                alert("No se pudo completar la compra");
            }
        } else {
            alert("Por favor inicia sesión para realizar la compra.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Tu Carrito</h2>
            {cart.length === 0 ? (
                <p>No tienes productos en tu carrito.</p>
            ) : (
                <div>
                    <ul className="list-group">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item list-group-item d-flex justify-content-between align-items-center p-3" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <div className="d-flex align-items-center">
                                    <img 
                                        src={item.img} 
                                        alt={item.name} 
                                        className="cart-item-image me-3" 
                                        style={{ width: '290px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} // Tamaño aumentado
                                    />
                                    <div className="cart-item-info">
                                        <h5 className="mb-1"><strong>{item.name}</strong></h5>
                                        <p className="mb-1">Cantidad: {item.quantity}</p>
                                        <p className="mb-1">Precio total: ${((item.price * item.quantity).toLocaleString('es-ES'))}</p>
                                        <div className="d-flex align-items-center mt-2">
                                            <button onClick={() => decrementQuantity(item.id)} className="btn btn-secondary me-2">-</button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button onClick={() => incrementQuantity(item.id)} className="btn btn-primary">+</button>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger ms-3">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 text-end">
                        <h5>Total: ${total.toLocaleString('es-ES')}</h5>
                        <button onClick={handleCheckout} className="btn btn-success mt-2 mb-3"> {/* Cambiado a btn-success para color verde */}
                            <FontAwesomeIcon icon={faCreditCard} /> Pagar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
