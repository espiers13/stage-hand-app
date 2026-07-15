import { fetchCompanyMembers } from "../api/api";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function ProductionCard({ production }) {
  const { user, token, logout } = useUser();
  const [myRole, setMyRole] = useState("");
  const [director, setDirector] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  console.log(production);

  function handleClick() {
    navigate(`/productions/${production.id}`);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCompanyMembers(token, production.id)
      .then((data) => {
        setMyRole(data.find((m) => m.user_id === user.id)?.role);
        setDirector(data.find((m) => m.role === "Director") ?? null);
      })
      .finally(() => setIsLoading(false));
  }, [production]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-6 lg:px-8">
        <div className="bg-gray-50 max-w-96 rounded-xl p-3 text-sm">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <button
      className="bg-slate-200 w-96 rounded-xl p-3 text-sm shadow-md hover:bg-slate-100 focus:bg-white transition-colors "
      onClick={handleClick}
    >
      <p>
        <span className="font-bold">Production Title: </span>
        {production.title}
      </p>
      <p className="mt-0.5">
        <span className="font-bold">Production Dates: </span>
        {production.production_dates
          .map((date) =>
            new Date(date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            }),
          )
          .join(", ")}
      </p>
      <p className="mt-0.5">
        <span className="font-bold">Venue: </span>
        {production.venue}
      </p>
      <p className="mt-0.5">
        <span className="font-bold">Director: </span>
        {director?.username ?? "TBC"}
      </p>
      <p className="mt-0.5">
        <span className="font-bold">My Role: </span>
        {myRole}
      </p>
    </button>
  );
}

export default ProductionCard;
