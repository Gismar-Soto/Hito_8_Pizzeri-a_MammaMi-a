import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Profile = () => {
  const userEmail = 'usuario@ejemplo.com';  

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <h2>Perfil</h2>
      <p>Email: {userEmail}</p>
      <Button variant="danger">Cerrar sesion</Button>
    </Container>
  );
};

export default Profile;
