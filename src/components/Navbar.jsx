import {Link} from "react-router";

function Navbar() {
  return (
      <nav>
        <div>
          <h2>App Mototaxista</h2>
          <Link to="/dashboard">Inicio</Link>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </nav>
  )
}

export default Navbar;