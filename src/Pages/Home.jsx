import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa Link
import { FaPizzaSlice, FaShoppingCart, FaEye } from "react-icons/fa";
import { useCart } from '../components/CartContext';

const Home = () => {
    const { addToCart } = useCart(); // Usar el contex
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5001/api/pizzas")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setPizzas(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando pizzas...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (pizzas.length === 0) {
        return <p>No se encontraron pizzas. Verifica la API.</p>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className="col-md-4">
                        <div className="pizza-card card">
                            <img
                                src={pizza.img || pizza.image}
                                alt={pizza.name}
                                className="pizza-img card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="pizza-title card-title">{pizza.name}</h5>
                                <div className="pizza-ingredients">
                                    <span className="pizza-ingredients-label">
                                        <FaPizzaSlice className="pizza-icon" /> Ingredientes:
                                    </span>
                                    <ul className="pizza-ingredients-list list-unstyled">
                                        {pizza.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="pizza-price">Precio: ${pizza.price.toLocaleString('es-ES')}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/pizza/${pizza.id}`} className="btn btn-outline-secondary">
                                        Ver Más <FaEye />
                                    </Link>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => addToCart(pizza)} // addToCart contex
                                    >
                                        Añadir <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
