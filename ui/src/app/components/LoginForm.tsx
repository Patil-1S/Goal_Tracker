"use client";

import { useForm, SubmitHandler } from "react-hook-form";
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

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data);
  };

  const router = useRouter();
  const [user, setUser] = React.useState({
    mobile: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

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
    if (user.mobile.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register("mobile", { required: "Mobile is required" })}
            id="mobile"
            type="text"
            placeholder="Mobile"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          />

          {errors.mobile && (
            <span className="text-red-500">{errors.mobile.message}</span>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            id="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <button
          onClick={onLogin}
            type="submit"
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            {buttonDisabled ? "No Login" : "Login"}
          </button>

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don&apos;t have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
