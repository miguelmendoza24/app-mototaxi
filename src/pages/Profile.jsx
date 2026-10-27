import { useAuth } from "../context/AuthContext";

function Profile() {
  const {user} = useAuth();

  return (
    <section className="app-container profile-page">
      <h1>Mi Perfil</h1>
      <p>Bienvenido a tu perfil. Aquí puedes ver tu información personal.</p>
      <div className="profile-card">
        <p>Nombre: {user.displayName}</p>
        <p>Correo electrónico: {user.email}</p>
        <p>Fecha de ingreso: {new Date(user.metadata.creationTime).toLocaleDateString("es-MX")}</p>
      </div>
    </section>
  );
}
export default Profile;
