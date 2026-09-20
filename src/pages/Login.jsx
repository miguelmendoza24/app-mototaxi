function Login() {
  return (
    <section>
      <h1>Iniciar sesión</h1>
      <form>
        <label htmlFor="email">Correo electrónico</label>
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

        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}
export default Login;
