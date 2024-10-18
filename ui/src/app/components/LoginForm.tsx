"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ILoginFormInput {
  mobile: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const router = useRouter();
  const [user, setUser] = React.useState({
    mobile: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true); // Initially disabled

  const onLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        user
      );
      console.log("Login success", response.data);
      router.push("/createtask");
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.mobile && user.password));
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-green-400 w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

        <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("mobile", { required: "Mobile is required" })}
              id="mobile"
              type="text"
              placeholder="Mobile"
              value={user.mobile}
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.mobile && (
              <span className="text-red-500 text-sm">{errors.mobile.message}</span>
            )}
          </div>

          <div>
            <input
              {...register("password", { required: "Password is required" })}
              id="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={buttonDisabled}
            className={`w-full bg-green-600 text-white font-bold py-2 rounded-md transition duration-300 ease-in-out hover:bg-green-700 ${
              buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Login
          </button>

          <Link className="text-sm text-center text-gray-600 mt-3" href={"/register"}>
            Don&apos;t have an account?{" "}
            <span className="underline text-green-600 hover:text-green-800">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
