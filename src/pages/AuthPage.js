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
  const navigate = useNavigate(); // Used for navigation

  const handleToggleSignup = () => setIsSignup(!isSignup);
  const handleToggleOTPLogin = () => setIsOTPLogin(!isOTPLogin);

  const handleLoginOrSignup = async (e) => {
    e.preventDefault();
    const url = isSignup
      ? "http://localhost:5000/api/signup"
      : isOTPLogin
      ? "http://localhost:5000/api/login-otp"
      : "http://localhost:5000/api/login";

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

        // Redirect to dashboard on successful login
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
      const response = await fetch("http://localhost:5000/api/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await response.json();
      setMessage(data.message || "OTP sent successfully!");
    } catch (error) {
      setMessage("Failed to generate OTP. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the Reset Password page
    navigate("/reset-password");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded mt-10">
        <h1 className="text-xl font-bold text-center mb-5">
          {isSignup ? "Signup" : isOTPLogin ? "OTP Login" : "Login"}
        </h1>
        <form onSubmit={handleLoginOrSignup}>
          {isSignup ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded"
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
                  className="w-full mt-1 p-2 border rounded"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleGenerateOTP}
                  className="text-sm text-blue-600 underline"
                >
                  Generate OTP
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">OTP</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded"
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
                  className="w-full mt-1 p-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleToggleSignup}
            className="text-sm text-blue-600 underline"
          >
            {isSignup ? "Switch to Login" : "Switch to Signup"}
          </button>
          <button
            onClick={handleToggleOTPLogin}
            className="text-sm text-blue-600 underline"
          >
            {isOTPLogin ? "Email/Password Login" : "OTP Login"}
          </button>
        </div>
        {!isSignup && (
          <button
            onClick={handleForgotPassword}
            className="mt-4 text-sm text-blue-600 underline block mx-auto"
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
