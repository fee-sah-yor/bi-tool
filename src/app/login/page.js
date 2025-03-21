"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../utils/authContext";
import { validateEmail } from "../utils/validation";
import { LoginRequest } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("please fill required fields");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    }
    setLoading(true);

    try {
      const data = await LoginRequest(email,password);
      if (data && data.length > 0) {
        setLoading(false);
        setEmailError("");
        login(
          data.map((info) => info.token),
          keepLoggedIn
        );
        router.push("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 border-t-4 border-[#ED1450]">
          <h2 className="text-xl font-bold mb-6 text-center text-[#ED1450]">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-center text-sm mb-6">
            Sign in to access your dashboard
          </p>
          {error && (
            <div className="text-red-600 font-medium text-base">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border text-xs border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-[#ED1450] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border text-xs border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-[#ED1450] focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-gray-700 text-xs">
                <input
                  type="checkbox"
                  className="mr-2 rounded accent-[#ed1450]"
                  checked={keepLoggedIn}
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                />
                Keep me logged in
              </label>
              <a href="#" className="text-[#ED1450] hover:underline text-xs">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={!email || !password || loading}
              className="w-full bg-[#ED1450] text-white cursor-pointer py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-[#9b5b6a] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-gray-600 text-center text-xs mt-4">
            Don't have an account?
            <Link
              href="/registration"
              className="text-[#ED1450] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
