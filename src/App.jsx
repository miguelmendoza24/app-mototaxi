import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterTrip from "./pages/RegisterTrip";
import TripHistory from "./pages/TripHistory";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips/new" element={<RegisterTrip />} />
        <Route path="/trips" element={<TripHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
