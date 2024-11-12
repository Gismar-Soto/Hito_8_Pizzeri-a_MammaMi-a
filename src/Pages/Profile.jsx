import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import UserContext from '../components/UserContext';

const Profile = () => {
  const { email, logout } = useContext(UserContext);

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <h2>Perfil</h2>
      <p>Email: {email || "Usuario no autenticado"}</p>
      <Button variant="danger" onClick={logout}>Cerrar sesión</Button>
    </Container>
  );
};

export default Profile;

