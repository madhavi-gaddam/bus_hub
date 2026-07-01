import { Link } from "react-router-dom";
import { useCallback, useContext } from "react";
import { BookingContext } from "../Context/BookingContextObject";
import { AuthContext } from "../Context/AuthContextObject";

function Navbar() {
  const { count, resetBookings } = useContext(BookingContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
    resetBookings();
  }, [logout, resetBookings]);

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
          Booked Tickets : {isAuthenticated ? count : 0}
        </span>
        {isAuthenticated ? (
          <>
            <span className="text-sm font-semibold text-white">{user.name}</span>
            <button
              className="rounded-md bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-950"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="rounded-md bg-white px-4 py-2 font-semibold text-slate-800 hover:bg-slate-100" to="/signup">
              Signup
            </Link>
            <Link className="rounded-md bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-950" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
