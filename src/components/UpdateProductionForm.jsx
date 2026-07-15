import { useState } from "react";
import { useUser } from "../context/UserContext";
import { createNewRehearsal, patchProduction } from "../api/api";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

function UpdateProductionForm({
  production,
  companyMembers,
  setUpdateProduction,
  updateProduction,
}) {
  const { user, token, logout } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const productionId = production.id;
  const [title, setTitle] = useState(production.title);
  const [dates, setDates] = useState(production.production_dates);
  const [venue, setVenue] = useState(production.venue);
  const [scenes, setScenes] = useState(production.scenes);
  const [calledMembers, setCalledMembers] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const updates = { title, production_dates: dates, venue, scenes };
    patchProduction(production.id, updates, token).then((data) => {
      console.log(data);
      setUpdateProduction(updateProduction + 1);
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 mt-2">
      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="title" className="text-sm">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          className="p-2 rounded-lg border border-gray-400 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="startTime" className="text-sm">
          Dates
        </label>
        <Flatpickr
          className="date-input"
          options={{
            mode: "multiple",
            dateFormat: "Y-m-d",
            defaultDate: dates,
          }}
          onChange={(dates) => setDates(dates)}
        />
      </div>

      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="location" className="text-sm">
          Venue
        </label>
        <input
          id="location"
          type="text"
          name="location"
          value={venue}
          className="p-2 rounded-lg border border-gray-400 text-sm"
          onChange={(e) => setVenue(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="location" className="text-sm">
          Scenes
        </label>
        <input
          id="location"
          type="number"
          name="location"
          value={scenes}
          className="p-2 rounded-lg border border-gray-400 text-sm"
          onChange={(e) => setScenes(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <button
          className={`rounded-xl transition-colors duration-300 p-0.5 w-40 ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-300 hover:bg-green-400"
          }`}
        >
          {!isLoading ? "Make Changes" : "Loading"}
        </button>
      </div>
    </form>
  );
}

export default UpdateProductionForm;
