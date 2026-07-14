import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(email, password);
    loginUser(email, password)
      .then((data) => {
        login(data.user, data.token);
        navigate("/user");
      })
      .catch((err) => {
        if (err.response?.data?.msg === "User not found") {
          setError("No account found with that username.");
          setIsLoading(false);
        } else if (err.response?.data?.msg === "Invalid password") {
          setError("Incorrect password.");
          setIsLoading(false);
        } else {
          setError("Something went wrong. Please try again.");
          setIsLoading(false);
        }
      });
  }

  function handleForgotPassword(e) {
    console.log("Forgot password");
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 lg:px-8">
      <h1 className="text-xl font-bold">Welcome back</h1>
      <p className="text-xs mt-1 mb-2">Please enter your details.</p>
      <div className="bg-gray-50 max-w-96 rounded-xl shadow-xl p-3">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 mt-2">
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="email" className="text-sm">
              Email Address
            </label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="name@email.com"
              className="p-2 rounded-lg border border-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="email" className="text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              className="p-2 rounded-lg border border-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="text-xs font-bold hover:underline"
              type="button"
              onClick={handleForgotPassword}
            >
              Forgot password
            </button>
          </div>
          <button
            className={`rounded-xl transition-colors duration-300 p-0.5 ${
              isLoading
                ? "bg-slate-500 cursor-not-allowed"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
          >
            {!isLoading ? "Login" : "Loading"}
          </button>
        </form>
        <button
          className="text-xs hover:underline mt-2"
          onClick={(e) => navigate("/signup")}
        >
          Don't have an account? Click here to sign up!
        </button>
      </div>
    </div>
  );
}

export default Login;
