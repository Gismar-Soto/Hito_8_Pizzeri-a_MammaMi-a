import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useCart } from '../components/CartContext';
import { API_CONFIG } from "../Pages/config";


const Cart = () => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart, total } = useCart();
    const { token } = useContext(UserContext);

    const handleCheckout = async () => {
        if (!token) {
            alert("Debes iniciar sesión para realizar el pago");
            return;
        }

        try {
            const response = await fetch(`http://${API_CONFIG.ip}:${API_CONFIG.port}/api/checkouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ cart, total }),
            });

            if (response.ok) {
                alert("¡Compra realizada con éxito!");
            } else {
                throw new Error("Error al realizar la compra");
            }
        } catch (error) {
            console.error("Error en el proceso de compra:", error);
            alert("Error en el proceso de compra");
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
                            <li key={item.id} className="cart-item list-group-item d-flex justify-content-between align-items-center">
                                <div className="cart-item-details d-flex align-items-center">
                                    <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} style={{ width: "50px", marginRight: "15px" }} />
                                    <div>
                                        <h5>{item.name}</h5>
                                        <p>Cantidad: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="cart-item-actions">
                                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                                    <button onClick={() => removeFromCart(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${total}</h3>
                    <button className="btn btn-primary mt-3" onClick={handleCheckout}>
                        <FontAwesomeIcon icon={faCreditCard} /> Realizar Compra
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;