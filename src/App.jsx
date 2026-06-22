import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import NewProduction from "./pages/NewProduction";
import Login from "./pages/Login";
import Productions from "./pages/Productions";
import Schedule from "./pages/Schedule";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/productions/:id" element={<Productions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productions/new" element={<NewProduction />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/signup" element={<SignUp />} />{" "}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
