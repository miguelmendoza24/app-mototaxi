function Profile() {
  const driver = {
    name: "Miguel Mendoza",
    email: "miguel@example.com",
    registrationDate: "23/09/2026",
  };

  return (
    <section className="app-container profile-page">
      <h1>Mi Perfil</h1>
      <p>Bienvenido a tu perfil. Aquí puedes ver tu información personal.</p>
      <div className="profile-card">
        <p>Nombre: {driver.name}</p>
        <p>Correo electrónico: {driver.email}</p>
        <p>Fecha de ingreso: {driver.registrationDate}</p>
      </div>
    </section>
  );
}
export default Profile;
