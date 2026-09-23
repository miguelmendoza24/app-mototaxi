import {Link} from "react-router";

function Navbar() {
  return (
      <nav>
        <div>
          <h2>App Mototaxista</h2>
          <Link to="/dashboard">Inicio</Link>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Crear cuenta</Link>
          <Link to="/trips/new">Registrar Viaje</Link>
          <Link to="/trips">Historial de Viajes</Link>
        </div>
      </nav>
  )
}

export default Navbar;