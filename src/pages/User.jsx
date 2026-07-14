import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { fetchProductions } from "../api/api";
import ProductionCard from "../components/ProductionCard";

function User() {
  const { user, token, logout } = useUser();
  const [productions, setProductions] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    setButtonLoading(true);
    logout();
    navigate("/login");
  }

  useEffect(() => {
    setIsLoading(true);
    fetchProductions(token).then((data) => {
      setProductions(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 lg:px-8">
      <h1 className="text-xl font-bold">Hello {user.username}!</h1>
      <button
        onClick={(e) => setShowDetails(!showDetails)}
        className="hover:underline text-sm mt-3"
      >
        Account details
      </button>
      {showDetails && <UserCard user={user} />}
      <div className="text-center mt-5">
        <div>
          <hr className="my-1 border-neutral-400 border-0.5" />
          <h1 className="font-bold">My productions</h1>
          <div className="mb-3">
            {productions.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing scheduled this week
              </p>
            ) : (
              productions.map((production, index) => (
                <ProductionCard production={production} key={index} />
              ))
            )}
          </div>
        </div>
        <div>
          <hr className="my-1 border-neutral-400 border-0.5" />

          <h1 className="font-bold">My rehearsal schedule</h1>
        </div>
      </div>

      <button
        className={`rounded-xl transition-colors duration-300 p-2 mt-10 shadow-md ${
          buttonLoading
            ? "bg-slate-500 cursor-not-allowed"
            : "bg-slate-300 hover:bg-slate-400"
        }`}
        onClick={handleLogout}
      >
        {!buttonLoading ? "Log out" : "Loading"}
      </button>
    </div>
  );
}

export default User;
