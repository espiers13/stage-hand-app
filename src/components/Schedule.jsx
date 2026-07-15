function Schedule({ schedule }) {
  const sorted = [...schedule].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col gap-4 mt-3">
      {sorted.map((r) => {
        const isPast = new Date(r.date) < today;

        return (
          <div
            key={r.id}
            className={`bg-gray-50 rounded-xl p-4 border border-gray-200 ${
              isPast ? "opacity-50" : ""
            }`}
          >
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {new Date(r.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="font-bold mt-1">{r.title}</p>
            <p className="text-sm">
              {r.start_time} – {r.end_time} · {r.location}
            </p>
            {r.notes && <p className="text-sm text-gray-600 mt-1">{r.notes}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default Schedule;
