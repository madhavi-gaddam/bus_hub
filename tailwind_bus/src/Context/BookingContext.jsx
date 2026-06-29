import { useState } from "react";
import busData from "../Data/BusData";
import { BookingContext } from "./BookingContextObject";

function BookingProvider({ children }) {
  const [buses,setBuses]=useState(busData);
  const [count, setCount] = useState(0);

  const bookTicket = (id,quantity) => {
    setBuses(
      buses.map((bus)=>
      bus.id===id?{
        ...bus, availableSeats:bus.availableSeats-quantity,
      }
    :bus)
    )
    setCount(count + quantity);
  };

  return (
    <BookingContext.Provider value={{ buses,count, bookTicket, }}>
      {children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;
