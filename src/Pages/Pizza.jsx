import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowLeft, faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Importamos addToCart del contexto del carrito

  useEffect(() => {
    fetch(`http://localhost:5001/api/pizzas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la pizza");
        }
        return response.json();
      })
      .then((data) => {
        setPizza(data);
      })
      .catch((error) => {
        console.error("Error fetching pizza:", error);
      });
  }, [id]);

  if (!pizza) return <p>Cargando pizza...</p>;

  return (
    <div className="container my-5 p-4 rounded" style={{ backgroundColor: "#e8e8e8" }}>
      <div className="row align-items-center">
        {/* Imagen de la pizza */}
        <div className="col-md-6 text-center">
          <img
            src={pizza.img}
            alt={pizza.name}
            className="img-fluid rounded"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </div>

        {/* Detalles de la pizza */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{pizza.name}</h2>
          <p>{pizza.desc}</p>
          
          {/* Encabezado de Ingredientes con icono */}
          <h5 className="fw-bold mt-4">
            🍕 Ingredientes:
          </h5>
          <ul className="list-unstyled">
            {pizza.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-1">
                • {ingredient}
              </li>
            ))}
          </ul>

          <p className="fw-bold mb-4" style={{ fontSize: "1.2rem" }}>Precio: ${pizza.price.toLocaleString('es-ES')}</p>
          
          {/* Botón de Añadir al carrito */}
          <div className="d-flex gap-2">
          <Button variant="dark" onClick={() => addToCart(pizza)}>
    <FontAwesomeIcon icon={faCartShopping} /> Añadir al carrito
</Button>
            <Button variant="outline-dark" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faArrowLeft} /> Ver nuestro menú
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
