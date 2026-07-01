import { useCallback, useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContextObject";

function LoginPage() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = location.state?.from?.pathname || "/";

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const result = login(email, password);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Login successful!");
      navigate(redirectTo, { replace: true });
    },
    [email, login, navigate, password, redirectTo]
  );

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-start justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">Login</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="rounded-md border border-slate-300 px-3 py-2 text-base outline-none focus:border-sky-600"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className="text-sm font-semibold text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="rounded-md border border-slate-300 px-3 py-2 text-base outline-none focus:border-sky-600"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className="mt-2 rounded-md bg-sky-700 px-5 py-2.5 font-semibold text-white hover:bg-sky-800"
            type="submit"
          >
            Login
          </button>

          <p className="text-sm text-slate-600">
            New user? <Link className="font-semibold text-sky-700" to="/signup">Signup first</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
