import { useParams } from "react-router-dom";
import { useContext ,useState} from "react";

import { toast } from "react-toastify";

import { BookingContext } from "../Context/BookingContextObject";

function BusDetails() {
  const { id } = useParams();

  const { buses,bookTicket } =useContext(BookingContext);

  const bus = buses.find(
    (item) => item.id === Number(id)
  );
  const[qty,setQty]=useState(1);
  const isMinusDisabled = qty === 1;
  const isPlusDisabled = qty === bus.availableSeats;

  const handleBooking = () => {
    bookTicket(bus.id, qty);
    toast.success("Ticket Booked Successfully!");
   
  };

  return (
    <div className="bg-indigo-200 flex flex-col w-full max-w-[500px] mx-auto my-5 p-5 rounded-lg shadow-md">
      <h2 className="text-center font-bold text-2xl">{bus.operator}</h2>

      <p ><span className="font-bold ">From : </span>{bus.from}</p>

      <p ><span className="font-bold">To : </span>{bus.to}</p>

      <p ><span className="font-bold">Price : </span>{bus.price}</p>

      <p ><span className="font-bold">Departure : </span>{bus.departure}</p>

      <p ><span className="font-bold">Arrival Time: </span>{bus.arrival}</p>
      <p ><span className="font-bold">Available Seats:</span>{bus.availableSeats}</p>

      {bus.availableSeats > 0 ? (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
          <div className="w-40 flex items-center bg-purple-200 gap-3 px-3 py-2 rounded-lg">
            <button className="w-8 h-8 bg-violet-400 text-slate-800 rounded-md shadow cursor-pointer text-lg font-bold disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isMinusDisabled}
              onClick={() => setQty(qty - 1)}
            >
              -
            </button>
            <span className="min-w-6 text-center text-lg font-bold">{qty}</span>
            <button className="w-8 h-8 bg-violet-400 text-slate-800 rounded-md shadow cursor-pointer text-lg font-bold  disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPlusDisabled}
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          <button className="bg-violet-600 text-white w-40 px-5 py-2.5 rounded cursor-pointer" onClick={handleBooking}>
            Book {qty} {qty === 1 ? "Ticket" : "Tickets"}
          </button>
        </div>
      ) : (
        <p>No tickets available</p>
      )}
    </div>
  );
}

export default BusDetails;
