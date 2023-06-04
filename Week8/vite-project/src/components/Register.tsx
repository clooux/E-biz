import { useState } from "react";
import Api from "../Api";
import { useLocation } from "wouter";

function Register() {
  const [location, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (email: string, password: string) => {
    const response = await Api.post("/register", {
      Name: email,
      Password: password,
    });
    if (response.status == 200) {
      navigate("/login");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleRegister}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
