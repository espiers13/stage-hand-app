import Footer from "./components/Footer";
import Header from "./components/Header";
import NewProduction from "./pages/NewProduction";
import Login from "./pages/Login";
import Productions from "./pages/ProductionPage";
import ProductionPage from "./pages/ProductionPage";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

function App() {
  function ProtectedRoute({ children }) {
    const { token } = useUser();
    return token ? children : <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productions/:id"
            element={
              <ProtectedRoute>
                <ProductionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productions/"
            element={
              <ProtectedRoute>
                <Productions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productions/new"
            element={
              <ProtectedRoute>
                <NewProduction />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />{" "}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
