import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppRoutes from "./Routes/AppRoutes";
import BookingProvider from "./Context/BookingContext";
import AuthProvider from "./Context/AuthContext";

import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>

          <Navbar />
          <AppRoutes />

          <ToastContainer position="top-right" />
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
