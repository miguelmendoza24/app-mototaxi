import {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase/firebaseConfig";
import { useNavigate } from "react-router";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        setErrorMessage("");
        event.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            navigate("/dashboard");
            
    }catch (error) {
        if (error.code === "auth/email-already-in-use") {
            setErrorMessage("El correo ya esta registrado.");
        }else{
            setErrorMessage("Error al crear la cuenta.");
        }
    }
};



    return(
        <section className="app-container auth-page">
            <div className="auth-card">

            <h1 className="auth-title">Crear Cuenta</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre del conductor</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    />
                <label htmlFor="email">Correo Electrónico</label>
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
                <button type="submit">Registrarse</button>
            </form>
            {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}
                    </div>
        </section>
    )
}
export default Register;