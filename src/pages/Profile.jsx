function Profile() {

    const driver = {
  name: "Miguel Mendoza",
  email: "miguel@example.com",
  registrationDate: "23/09/2026"
}

    return (
        <section>
            <h1>Mi Perfil</h1>
            <p>Bienvenido a tu perfil. Aquí puedes ver tu información personal.</p>
            <p>Nombre: {driver.name}</p>
            <p>Correo electrónico: {driver.email}</p>
            <p>Fecha de ingreso: {driver.registrationDate}</p>
        </section>
    )
}
export default Profile;