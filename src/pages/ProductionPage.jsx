import { useParams } from "react-router-dom";
import {
  fetchRehearsalsByProduction,
  fetchProductionById,
  fetchCompanyMembers,
} from "../api/api";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import ScheduleCard from "../components/ScheduleCard";
import NewRehearsalForm from "../components/NewRehearsalForm";
import UpdateProductionForm from "../components/UpdateProductionForm";

function Productions() {
  const { user, token, logout } = useUser();
  const { id } = useParams();
  const [production, setProduction] = useState({});
  const [rehearsals, setRehearsals] = useState([]);
  const [companyMembers, setCompanyMembers] = useState([]);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newRehearsalPopup, setNewRehearsalPopup] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState(1);
  const [editPopup, setEditPopup] = useState(false);
  const [updateProduction, setUpdateProduction] = useState(1);
  const [productionDates, setProductionDates] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchProductionById(token, id).then((data) => {
      setProduction(data);
      setProductionDates(
        data.production_dates
          .map((date) =>
            new Date(date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            }),
          )
          .join(", "),
      );
      if (Number(data.created_by) === user.id) {
        setIsAuthorised(true);
      }
    });
  }, [updateProduction]);

  useEffect(() => {
    fetchRehearsalsByProduction(token, id).then((data) => {
      setRehearsals(data);
    });
  }, [updateSchedule]);

  useEffect(() => {
    fetchCompanyMembers(token, id).then((data) => {
      setCompanyMembers(data);
      setIsLoading(false);
    });
  }, [production]);

  function getGridCols(count) {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    return "grid-cols-2 lg:grid-cols-3";
  }
  function handleChanges(e) {
    setEditPopup(!editPopup);
  }

  function handleNewRehearsal(e) {
    setNewRehearsalPopup(!newRehearsalPopup);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      <h1 className="font-bold text-xl">{production.title}</h1>
      <div className="text-center mt-2 text-sm">
        <p className="mt-0.5">
          <span className="font-bold">Production Dates: </span>
          {productionDates}
        </p>
        <p className="mt-0.5">
          <span className="font-bold">Venue: </span>
          {production.venue}
        </p>
        <hr className="my-1 border-neutral-400 border-0.5" />
        <h1 className="font-bold underline">Company Members:</h1>
        {[...companyMembers]
          .sort((a, b) => {
            const priority = { Director: 0, "Stage Manager": 1 };
            const aPriority = priority[a.role] ?? 2;
            const bPriority = priority[b.role] ?? 2;
            return aPriority - bPriority;
          })
          .map((member) => (
            <p className="mt-0.5" key={member.user_id}>
              <span className="font-bold">{member.role}: </span>
              {member.username}
            </p>
          ))}
      </div>
      <hr className="my-3 border-neutral-400 border-0.5 w-full" />
      <div className="w-full text-center">
        <h1 className="font-bold text-xl mb-3">Rehearsal schedule</h1>
        <div className={`grid ${getGridCols(rehearsals.length)} gap-4`}>
          {[...rehearsals]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((rehearsal) => (
              <ScheduleCard
                key={rehearsal.id}
                rehearsal={rehearsal}
                isAuthorised={isAuthorised}
                setUpdateSchedule={setUpdateSchedule}
                updateSchedule={updateSchedule}
              />
            ))}
        </div>
      </div>
      <hr className="my-3 border-neutral-400 border-0.5 w-full" />

      {isAuthorised && (
        <div className="grid grid-cols-1 gap-2">
          <button
            className="bg-slate-300 py-1 px-2 rounded-lg hover:bg-slate-400 transition-colors"
            onClick={handleChanges}
          >
            Make changes to production
          </button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              editPopup
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <UpdateProductionForm
                production={production}
                companyMembers={companyMembers}
                setUpdateProduction={setUpdateProduction}
                updateProduction={updateProduction}
              />
            </div>
          </div>
          <button
            className="bg-slate-300 py-1 rounded-lg hover:bg-slate-400 transition-colors"
            onClick={handleNewRehearsal}
          >
            Create new rehearsal
          </button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              newRehearsalPopup
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <NewRehearsalForm
                production={production}
                companyMembers={companyMembers}
                setUpdateSchedule={setUpdateSchedule}
                updateSchedule={updateSchedule}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productions;
