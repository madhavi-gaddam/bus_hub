import { memo } from "react";
import { Link } from "react-router-dom";

function BusCard({ bus }) {
  return (
    <div className="bg-indigo-200 rounded-lg p-5 shadow-md text-center">
      <h3 className="text-center font-bold text-xl mt-5">{bus.operator}</h3>

      <p>
        {bus.from} ➜ {bus.to}
      </p>

      <p>{bus.departure}</p>

      <p>Price:{bus.price}</p>
      <p>Available Seats:{bus.availableSeats}</p>

      <Link to={`/bus/${bus.id}`}>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded cursor-pointer">View Details</button>
      </Link>
    </div>
  );
}

export default memo(BusCard);
