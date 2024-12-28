import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isOTPLogin, setIsOTPLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleToggleSignup = () => setIsSignup(!isSignup);
  const handleToggleOTPLogin = () => setIsOTPLogin(!isOTPLogin);

  const handleLoginOrSignup = async (e) => {
    e.preventDefault();
    const url = isSignup
      ? "https://pwd-b-3.onrender.com/api/signup"
      : isOTPLogin
      ? "https://pwd-b-3.onrender.com/api/login-otp"
      : "https://pwd-b-3.onrender.com/api/login";

    const body = isSignup
      ? { email, password, mobile }
      : isOTPLogin
      ? { mobile, otp }
      : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Operation successful!");
        if (!isSignup && !isOTPLogin) {
          navigate("/dashboard");
        }
      } else {
        setMessage(data.message || "Operation failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pwd-b-3.onrender.com/api/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await response.json();
      setMessage(data.message || "OTP sent successfully!");
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    }
  };
  

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex flex-col items-center">
      <Header />
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg mt-10 transform transition-all hover:scale-105">
        <h1 className="text-2xl font-extrabold text-center mb-5 text-purple-700">
          {isSignup ? "Create an Account" : isOTPLogin ? "OTP Login" : "Welcome Back!"}
        </h1>
        <form onSubmit={handleLoginOrSignup}>
          {isSignup ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border border-purple-300 rounded-lg shadow focus:ring focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border border-purple-300 rounded-lg shadow focus:ring focus:ring-purple-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-purple-300 rounded-lg shadow focus:ring focus:ring-purple-500"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
            </>
          ) : isOTPLogin ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-blue-300 rounded-lg shadow focus:ring focus:ring-blue-500"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleGenerateOTP}
                  className="text-sm text-blue-700 underline"
                >
                  Generate OTP
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">OTP</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-blue-300 rounded-lg shadow focus:ring focus:ring-blue-500"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border border-pink-300 rounded-lg shadow focus:ring focus:ring-pink-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border border-pink-300 rounded-lg shadow focus:ring focus:ring-pink-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg font-semibold shadow-lg transform transition-all hover:scale-105"
          >
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleToggleSignup}
            className="text-sm text-purple-700 underline hover:text-purple-900"
          >
            {isSignup ? "Switch to Login" : "Switch to Signup"}
          </button>
          <button
            onClick={handleToggleOTPLogin}
            className="text-sm text-blue-700 underline hover:text-blue-900"
          >
            {isOTPLogin ? "Email/Password Login" : "OTP Login"}
          </button>
        </div>
        {!isSignup && (
          <button
            onClick={handleForgotPassword}
            className="mt-4 text-sm text-pink-700 underline hover:text-pink-900 block mx-auto"
          >
            Forgot Password?
          </button>
        )}
        {message && (
          <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
