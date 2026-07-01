import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const SearchPage = lazy(() => import("../Pages/SearchPage"));
const BusDetails = lazy(() => import("../Pages/BusDetails"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const SignupPage = lazy(() => import("../Pages/SignupPage"));
const NotFound = lazy(() => import("../Pages/NotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<p className="mt-8 text-center text-slate-600">Loading...</p>}>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/bus/:id" element={<BusDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
