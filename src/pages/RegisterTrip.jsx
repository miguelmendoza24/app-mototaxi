import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterTrip() {
  const { user } = useAuth();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPickup = pickup.trim();
    const cleanDestination = destination.trim();

    if( !cleanPickup || !cleanDestination){
     console.error("El origen y el destino son obligatorios");
return;

    }

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      await addDoc(collection(db, "trips"), {
        pickup: cleanPickup,
        destination: cleanDestination,
        price: parseFloat(price),
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      setPickup("");
      setDestination("");
      setPrice("");
    } catch (error) {
      console.error("Error adding trip document: ", error);
    }
  };

  return (
    <section>
      <h1>Registrar Viaje</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pickup">Punto de inicio</label>
        <input
          type="text"
          id="pickup"
          name="pickup"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <label htmlFor="destination">Destino</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit">Registrar Viaje</button>
      </form>
    </section>
  );
}
export default RegisterTrip;
