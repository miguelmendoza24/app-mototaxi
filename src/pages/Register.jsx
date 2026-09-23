function Register() {
    return(
        <section>
            <h1>Crear Cuenta</h1>
            <form>
                <label htmlFor="name">Nombre del conductor</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                />
                <label htmlFor="email">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                />
                <button type="submit">Registrarse</button>
            </form>
        </section>
    )
}
export default Register;