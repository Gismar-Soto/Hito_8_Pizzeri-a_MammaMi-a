function Header() {
  return (
    <header className="header">
      <div className="text-center p-3">
        <h1 className="display-3">¡Pizzería Mamma Mia!</h1>
        <p className="lead">¡Tenemos las mejores pizzas que podrías encontrar!</p>
        <hr className="my-4" style={{ borderColor: 'white', width: '50%' }} />
      </div>
    </header>
  );
}

export default Header;