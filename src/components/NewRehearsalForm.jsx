import { useState } from "react";
import { useUser } from "../context/UserContext";
import { createNewRehearsal } from "../api/api";

function NewRehearsalForm({
  production,
  companyMembers,
  setUpdateSchedule,
  updateSchedule,
}) {
  const { user, token, logout } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const productionId = production.id;
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [called, setCalled] = useState([]);
  const [calledMembers, setCalledMembers] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const newRehearsal = {
      date,
      start_time: startTime,
      end_time: endTime,
      location,
      called,
      scenes,
      ...(notes && { notes }),
    };
    createNewRehearsal(newRehearsal, productionId, token).then((data) => {
      setUpdateSchedule(updateSchedule + 1);
      setIsLoading(false);
    });
  }

  function handleToggle(userId) {
    setCalled((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  }

  function handleSceneToggle(sceneNumber) {
    setScenes((prev) =>
      prev.includes(sceneNumber)
        ? prev.filter((n) => n !== sceneNumber)
        : [...prev, sceneNumber],
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 mt-2">
      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="date" className="text-sm">
          Date
        </label>
        <input
          id="date"
          type="date"
          name="date"
          className="p-2 rounded-lg border border-gray-400 text-sm"
          required
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="startTime" className="text-sm">
          Start Time
        </label>
        <input
          id="startTime"
          type="time"
          name="startTime"
          className="p-2 rounded-lg border border-gray-400 text-sm"
          required
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="startTime" className="text-sm">
          End Time
        </label>
        <input
          id="endTime"
          type="time"
          name="endTime"
          className="p-2 rounded-lg border border-gray-400 text-sm"
          required
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="location" className="text-sm">
          Location
        </label>
        <input
          id="location"
          type="text"
          name="location"
          placeholder="Location"
          className="p-2 rounded-lg border border-gray-400 text-sm"
          required
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="location" className="text-sm">
          Notes
        </label>
        <textarea
          id="notes"
          placeholder="Add any notes..."
          rows={4}
          className="p-2 rounded-lg border border-gray-400 text-sm"
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="location" className="text-sm">
          Called
        </label>
        <div className="flex flex-col gap-2">
          {companyMembers.map((member) => (
            <label
              key={member.user_id}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={called.includes(member.user_id)}
                onChange={() => handleToggle(member.user_id)}
              />
              {member.username} ({member.role})
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm">Scenes</label>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: production.scenes }, (_, i) => i + 1).map(
            (sceneNumber) => (
              <label
                key={sceneNumber}
                className="flex items-center gap-1 text-sm"
              >
                <input
                  type="checkbox"
                  checked={scenes.includes(sceneNumber)}
                  onChange={() => handleSceneToggle(sceneNumber)}
                />
                Scene {sceneNumber}
              </label>
            ),
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className={`rounded-xl transition-colors duration-300 p-0.5 w-40 ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-300 hover:bg-green-400"
          }`}
        >
          {!isLoading ? "Post Rehearsal" : "Loading"}
        </button>
      </div>
    </form>
  );
}

export default NewRehearsalForm;
