import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import '../index.css';

const NotFound = () => {
  return (
    <Container className="text-center not-found-container" style={{ marginTop: '100px' }}>
      <h1 className="not-found-title">Oops! 404</h1>
      <p className="not-found-text">Parece que estás perdido en el espacio...</p>
      
      {/* GIF */}
      <img 
        src="https://media.tenor.com/eDchk3srtycAAAAi/piffle-error.gif" 
        alt="GIF de página no encontrada"
        className="not-found-gif"
      />
      
      <Button variant="info" as={Link} to="/" className="mt-3 not-found-button">
        Volver al Inicio
      </Button>
    </Container>
  );
};

export default NotFound;