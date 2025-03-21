"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
// import { validateEmail } from "../constants/validation";
import { saveToken } from "../utils/localStorage";
import { RegisterUser } from "../utils/api";
import { validateEmail } from "../utils/validation";
// import { RegisterRequest } from "./api";  // Uncomment if using external fetch function

export default function Register() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validation = () => {
    if (!formDetails.name || !formDetails.email || !formDetails.password || !formDetails.confirmPassword) {
      setError("Please fill required fields.");
      return false;
    }
   
    if (!validateEmail(formDetails.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formDetails.password !== formDetails.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) return;
    setLoading(true);

    try {
      const data = await RegisterUser({
        name: formDetails.name,
        email: formDetails.email,
        password: formDetails.password,
      });
      setLoading(false);
      if (data.token) {
        alert("You have successfully registered");
        saveToken(data.token);
        router.push("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  const formData = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      value: formDetails.name,
      placeholder: "Enter your full name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formDetails.email,
      placeholder: "Enter your email address",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: formDetails.password,
      placeholder: "Enter your password",
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: formDetails.confirmPassword,
      placeholder: "Please confirm your password",
    },
  ];

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white py-10 px-4 rounded-2xl space-y-6 max-h-[500px] overflow-auto shadow-2xl w-[80%] border-t-4 border-[#ED1450]">
          <h2 className="text-xl font-bold text-center text-[#ED1450]">Create an Account</h2>
          <p className="text-gray-600 text-sm text-center">Join us to access your dashboard</p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:grid sm:grid-cols-2"
          >
            {formData.map((items, index) => (
              <div key={index}>
                <label className="block text-gray-700 text-sm font-semibold">
                  {items.label}
                </label>
                <input
                  type={items.type}
                  placeholder={items.placeholder}
                  name={items.name}
                  className="w-full p-3 border border-gray-300 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-[#ED1450] focus:outline-none"
                  value={items.value}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </form>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#ED1450] text-white cursor-pointer py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-[#9b5b6a] transition"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="text-gray-600 text-center text-xs">
            Already have an account?
            <Link href="/login" className="text-[#ED1450] hover:underline"> Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
