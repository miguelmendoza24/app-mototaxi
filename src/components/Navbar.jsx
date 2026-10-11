import { Link } from "react-router";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav>
      <div>
        <h2>App Mototaxista</h2>
        <Link to="/dashboard">Inicio</Link>
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/register">Crear cuenta</Link>
        <Link to="/trips/new">Registrar Viaje</Link>
        <Link to="/trips">Historial de Viajes</Link>
        <Link to="/profile">Mi perfil</Link>
        {user && <button onClick={handleSignOut}>Cerrar sesión</button>}
      </div>
    </nav>
  );
}

export default Navbar;
