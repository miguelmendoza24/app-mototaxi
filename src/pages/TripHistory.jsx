import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext.jsx";

function TripHistory() {
  const { user, loading: authLoading } = useAuth();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (authLoading || !user) return;

    const fetchTripHistory = async () => {
      setLoading(true);
      setError("");

      try {
        const q = query(
          collection(db, "trips"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
        );

        const querySnapshot = await getDocs(q);

        const tripsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrips(tripsData);
      } catch (error) {
        console.error("Error al consultar los viajes", error);
        setError("No se pudieron cargar los viajes.");
      } finally {
        setLoading(false);
      }
    };

    fetchTripHistory();
  }, [user, authLoading]);

  return (
    <section>
      <h1>Historial de Viajes</h1>
      <p>Consulta los viajes que has realizado.</p>

      {loading ? (
        <p>Cargando viajes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : trips.length === 0 ? (
        <p>No has realizado ningún viaje aún.</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <h2>Viaje {trip.id}</h2>
              <p>Origen: {trip.pickup}</p>
              <p>Destino: {trip.destination}</p>
              <p>Precio: ${Number(trip.price).toFixed(2)} MXN</p>
              <p>
                Fecha:{""}
                {trip.createdAt?.toDate
                  ? trip.createdAt?.toDate().toLocaleDateString("es-MX")
                  : "Fecha pendiente"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default TripHistory;
