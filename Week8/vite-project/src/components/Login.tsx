import { useState } from "react";
import Api from "../Api";
import { useLocation } from "wouter";

function Login() {
  const [location, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = async (email: string, password: string) => {
    const response = await Api.post("/auth", {
      Name: email,
      Password: password,
    });
    if (response.status == 200) {
      sessionStorage.setItem("auth", "true");
    }
    const path = sessionStorage.getItem("path");
    if (path) {
      navigate(path, { replace: true });
      sessionStorage.setItem("path", "");
    } else {
      navigate("/products");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth(email, password);
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="w-2/5 pb-14 text-center text-2xl font-medium">
        <p>Logowanie</p>
      </div>
      <div className="w-96 font-medium">
        <form className=" " onSubmit={handleLogin}>
          <label className="flex flex-col py-2">
            <span className="flex py-2">Email</span>
            <input
              type="email"
              name="email"
              placeholder={"adres@email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                "py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
              }
              required
            />
          </label>
          <label className="flex flex-col py-2">
            <span className="flex py-2s">Hasło</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                "py-3 px-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
              }
              required
            />
          </label>
          <div className="flex flex-col justify-center items-center">
            <button
              type="submit"
              className="mt-12 mb-3 px-12 py-2  transition hover:scale-110 delay-150 rounded-lg bg-slate-500
                               hover:bg-slate-700 text-white"
            >
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
