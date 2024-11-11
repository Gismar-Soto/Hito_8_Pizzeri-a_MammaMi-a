import { Button } from "react-bootstrap";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash, faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CardPizza = ({ pizza, addToCart, removeFromCart }) => {
  return (
    <div className="pizza-card">
      <Link to={`/pizza/${pizza.id}`}>
        <img src={pizza.image} alt={pizza.name} className="pizza-img" />
      </Link>
      <div className="pizza-body">
        <h3 className="pizza-title">{pizza.name}</h3>
        <p className="pizza-price">Precio: ${pizza.price.toLocaleString('es-ES')}</p>

        <div className="pizza-ingredients">
          <p className="pizza-ingredients-label">
            <FontAwesomeIcon icon={faPizzaSlice} style={{ color: "orange" }} className="me-2" />
            Ingredientes:
          </p>
          <ul className="pizza-ingredients-list">
            {pizza.ingredients.map((ingredient, index) => (
              <li key={index} className="pizza-ingredient-item">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex justify-content-between">
          <Button style={{ backgroundColor: "grey", border: "none" }} className="pizza-btn" onClick={() => removeFromCart(pizza.id)}>
            <FontAwesomeIcon icon={faTrash} /> Eliminar
          </Button>
          <Button style={{ backgroundColor: "black", border: "none" }} className="pizza-btn" onClick={() => addToCart(pizza.id)}>
            <FontAwesomeIcon icon={faCartShopping} /> Añadir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
