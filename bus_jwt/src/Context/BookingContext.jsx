import { useCallback, useMemo, useState } from "react";
import busData from "../Data/BusData";
import { BookingContext } from "./BookingContextObject";

function BookingProvider({ children }) {
  const [buses,setBuses]=useState(busData);
  const [count, setCount] = useState(0);

  const bookTicket = useCallback((id,quantity) => {
    setBuses((currentBuses) =>
      currentBuses.map((bus)=>
      bus.id===id?{
        ...bus, availableSeats:bus.availableSeats-quantity,
      }
    :bus)
    )
    setCount((currentCount) => currentCount + quantity);
  }, []);

  const resetBookings = useCallback(() => {
    setBuses(busData);
    setCount(0);
  }, []);

  const value = useMemo(
    () => ({ buses, count, bookTicket, resetBookings }),
    [bookTicket, buses, count, resetBookings]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;
