import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import Schedule from "../components/Schedule";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { fetchProductions, fetchSchedule } from "../api/api";
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
    });
  }, []);

  useEffect(() => {
    fetchSchedule(token).then((data) => {
      setSchedule(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-12">
      <h1 className="text-xl font-bold">Hello {user.username}!</h1>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="hover:underline text-sm mt-3"
      >
        Account details
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          showDetails
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <UserCard user={user} />
        </div>
      </div>
      <div className="text-center mt-2">
        <div>
          <hr className="my-1 border-neutral-400 border-0.5" />
          <h1 className="font-bold">My productions</h1>
          <hr className="my-1 border-neutral-400 border-0.5" />
          <div className="my-3 grid grid-cols-1 gap-3">
            {productions.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing scheduled this week
              </p>
            ) : (
              productions.map((production, index) => (
                <ProductionCard
                  production={production}
                  key={index}
                  token={token}
                  user={user}
                />
              ))
            )}
          </div>
        </div>
        <div className="mt-4">
          <hr className="my-1 border-neutral-400 border-0.5" />

          <h1 className="font-bold">My rehearsal schedule</h1>
          <hr className="my-1 border-neutral-400 border-0.5 mb-3" />
          <Schedule schedule={schedule} />
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
