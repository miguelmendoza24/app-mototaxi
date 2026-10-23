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
      <section className="app-container dashboard-page">
        <h1 className="dashboard-title">Resumen de viajes</h1>
        <p className="dashboard-message">Cargando resumen diario...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="app-container dashboard-page">
        <h1 className="dashboard-title">Resumen de viajes</h1>
        <p className="dashboard-message" role="alert">{error}</p>
      </section>
    );
  }

  return (
    <section className="app-container dashboard-page">
      <h1 className="dashboard-title">Resumen de viajes</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
<p className="dashboard-label">Ganancias de hoy</p>
<p className="dashboard-value">
  ${dailyEarnings.toFixed(2)} MXN
</p>
        
        </div>
        <div className="dashboard-card">
        <p className="dashboard-label">Viajes realizados</p>
        <p className="dashboard-value">
          {dailyTrips}
        </p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
