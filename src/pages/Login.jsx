import {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <section>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input 
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        />
        <label htmlFor="password">Contraseña</label>
        <input
         type="password"
         id="password"
         name="password"
         value={password}
         onChange={(event) => setPassword(event.target.value)}
         required
         />

        <button type="submit">Ingresar</button>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
}
export default Login;
