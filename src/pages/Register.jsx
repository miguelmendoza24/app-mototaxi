import {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase/firebaseConfig";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        setErrorMessage("");
        event.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            
    }catch (error) {
        if (error.code === "auth/email-already-in-use") {
            setErrorMessage("El correo ya esta registrado.");
        }else{
            setErrorMessage("Error al crear la cuenta.");
        }
    }
};



    return(
        <section>
            <h1>Crear Cuenta</h1>
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
            {errorMessage && <p>{errorMessage}</p>}
        </section>
    )
}
export default Register;