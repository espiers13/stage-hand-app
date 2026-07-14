function ProductionCard({ production }) {
  console.log(production);

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const startDate = new Date(production.start_date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const endDate = new Date(production.end_date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="flex flex-col items-center px-6 lg:px-8">
      <div className="bg-gray-50 max-w-96 rounded-xl p-3 text-sm">
        <p>
          <span className="font-bold">Production Title: </span>
          {production.title}
        </p>
        <p>
          <span className="font-bold">Production Dates: </span>
          {startDate} - {endDate}
        </p>
        <p>
          <span className="font-bold">Venue: </span>
          {production.venue}
        </p>
        <p>
          <span className="font-bold">Director: </span>
          Director WORK ON THIS
        </p>
      </div>
    </div>
  );
}

export default ProductionCard;
