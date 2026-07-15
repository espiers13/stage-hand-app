import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { fetchUsernameById, deleteRehearsal } from "../api/api";
import { useUser } from "../context/UserContext";

function ScheduleCard({
  rehearsal,
  isAuthorised,
  setUpdateSchedule,
  updateSchedule,
}) {
  const { user, token, logout } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [calledMembers, setCalledMembers] = useState([]);

  const { called } = rehearsal;

  useEffect(() => {
    setIsLoading(true);
    Promise.all(called.map((call) => fetchUsernameById(call)))
      .then((results) => {
        setCalledMembers(results.map(({ username }) => username));
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [called]);

  function handleEdit(e) {
    console.log("edit", rehearsal.id);
  }
  function handleDelete(e) {
    deleteRehearsal(rehearsal.id, rehearsal.production_id, token).then(() => {
      setUpdateSchedule(updateSchedule + 1);
    });
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative bg-gray-200 rounded-xl text-xs p-1.5">
      {isAuthorised && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          <button onClick={handleEdit}>
            <Pencil className="h-3.5 w-3.5 text-gray-500" />
          </button>
          <button onClick={handleDelete}>
            <Trash2 className="h-3.5 w-3.5 text-gray-500" />
          </button>
        </div>
      )}
      <div className="mb-3 mt-3.5">
        <p>
          <span className="font-bold">Date: </span>
          {new Date(rehearsal.date).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </p>
        <p className="mt-0.5">
          <span className="font-bold">Times: </span>
          {rehearsal.start_time.slice(0, 5)} - {rehearsal.end_time.slice(0, 5)}
        </p>
        <p className="mt-0.5">
          <span className="font-bold">Location: </span>
          {rehearsal.location}
        </p>
        {rehearsal.scenes.length !== 0 && (
          <p className="mt-0.5">
            <span className="font-bold">Scenes: </span>
            {rehearsal.scenes.join(", ")}
          </p>
        )}

        {called.length !== 0 && (
          <div className="mt-0.5">
            <p className="font-bold">Called: </p>
            {calledMembers.map((member) => (
              <p
                key={member}
                className={member === user.username ? "font-bold italic" : ""}
              >
                {member}
              </p>
            ))}
          </div>
        )}
        {rehearsal.notes && (
          <div className="mt-0.5">
            <p className="font-bold mt-0.5">Notes:</p>
            <p className="italic">{rehearsal.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleCard;
