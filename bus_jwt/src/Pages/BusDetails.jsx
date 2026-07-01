import { useParams } from "react-router-dom";
import { useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { BookingContext } from "../Context/BookingContextObject";

function BusDetails() {
  const { id } = useParams();
  const { buses,bookTicket } =useContext(BookingContext);
  const[qty,setQty]=useState(1);

  const bus = useMemo(
    () => buses.find((item) => item.id === Number(id)),
    [buses, id]
  );
  const availableSeats = bus?.availableSeats ?? 0;

  const handleDecrease = useCallback(() => {
    setQty((currentQty) => Math.max(1, currentQty - 1));
  }, []);

  const handleIncrease = useCallback(() => {
    setQty((currentQty) => Math.min(availableSeats, currentQty + 1));
  }, [availableSeats]);

  const handleBooking = useCallback(() => {
    if (!bus) {
      return;
    }

    bookTicket(bus.id, qty);
    toast.success("Ticket Booked Successfully!");
  }, [bookTicket, bus, qty]);

  if (!bus) {
    return <p className="mt-8 text-center text-slate-600">Bus not found</p>;
  }

  const isMinusDisabled = qty === 1;
  const isPlusDisabled = qty === bus.availableSeats;

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
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="min-w-6 text-center text-lg font-bold">{qty}</span>
            <button className="w-8 h-8 bg-violet-400 text-slate-800 rounded-md shadow cursor-pointer text-lg font-bold  disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPlusDisabled}
              onClick={handleIncrease}
            >
              +
            </button>
          </div>

          <button className="bg-violet-600 text-white w-40 px-5 py-2.5 rounded cursor-pointer" onClick={handleBooking}>
            Book {qty} {qty === 1 ? "Ticket" : "Tickets"}
          </button>
        </div>
      ) : (
        <p className="font-bold mb-2 text-center text-xl">No tickets available</p>
      )}
    </div>
  );
}

export default BusDetails;
