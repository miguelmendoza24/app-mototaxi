import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function Dashboard() {
  const { user } = useAuth();

  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [dailyTrips, setDailyTrips] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchDailySummary = async () => {
      try {
        setLoading(true);
        setError("");

      const now = new Date();

      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );

      const startOfTomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );

      const q = query(
        collection(db, "trips"),
        where("userId", "==", user.uid),
        where("createdAt", ">=", startOfDay),
        where("createdAt", "<", startOfTomorrow),
      );
      const querySnapshot = await getDocs(q);

      let earnings = 0;
      querySnapshot.forEach((doc) => {
        const tripData = doc.data();
        earnings += Number(tripData.price) || 0;
      });

      setDailyEarnings(earnings);
      setDailyTrips(querySnapshot.size);
    } catch (error) {
      console.error("Error al consultar el resumen diario", error);
      setError("No se pudo cargar el resumen diario.");
    } finally {
      setLoading(false);
    }
     

    };
    fetchDailySummary();
  }, [user]);

if (loading) {
    return (
      <section>
        <h1>Resumen de viajes</h1>
        <p>Cargando resumen diario...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <h1>Resumen de viajes</h1>
        <p role="alert">{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Resumen de viajes</h1>
      <p>Ganancias de hoy: ${dailyEarnings.toFixed(2)} MXN</p>
      <p>Viajes realizados: {dailyTrips}</p>
    </section>
  );
}

export default Dashboard;
