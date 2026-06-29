import { Link } from "react-router-dom";
import { useContext } from "react";
import { BookingContext } from "../Context/BookingContextObject";

function Navbar() {
  const { count } = useContext(BookingContext);

  return (
    <nav className="bg-mist-400 px-6 py-2 mx-auto sticky top-0 flex flex-col sm:flex-row justify-between items-center gap-4 md:px-10">
      <div className="flex items-center gap-2"> 
         <img src="https://img.icons8.com/fluency/96/bus.png"

              className="w-8 h-8"
          />
          <h2 className="text-white text-2xl font-bold">BusTravel Hub</h2>
          </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <Link to="/" className="text-white no-underline mr-5focus:outline-none hover:text-black">Back To Search</Link>
        <span className="font-bold bg-rose-500 text-white px-4 py-3 rounded-lg hover:text-white">
          Booked Tickets : {count}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
