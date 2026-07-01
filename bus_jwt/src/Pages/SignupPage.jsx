import { useCallback, useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContextObject";

function SignupPage() {
  const { isAuthenticated, signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const result = signup(name, email, password);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Signup successful! Please login.");
      navigate("/login");
    },
    [email, name, navigate, password, signup]
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-start justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">Signup</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-slate-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="rounded-md border border-slate-300 px-3 py-2 text-base outline-none focus:border-sky-600"
            type="text"
            placeholder="John"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label className="text-sm font-semibold text-slate-700" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
            className="rounded-md border border-slate-300 px-3 py-2 text-base outline-none focus:border-sky-600"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className="text-sm font-semibold text-slate-700" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            className="rounded-md border border-slate-300 px-3 py-2 text-base outline-none focus:border-sky-600"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className="mt-2 rounded-md bg-sky-700 px-5 py-2.5 font-semibold text-white hover:bg-sky-800"
            type="submit"
          >
            Signup
          </button>

          <p className="text-sm text-slate-600">
            Already registered? <Link className="font-semibold text-sky-700" to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default SignupPage;
