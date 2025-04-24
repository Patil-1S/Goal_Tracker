"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import FormGroup from "../molecules/FormGroup";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { saveTokensToCookies } from "@/utils/cookies";

interface ILoginFormInput {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const onLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        user,
        { withCredentials: true }
      );
      console.log("Response", response)
      if (response.status === 200) {
        saveTokensToCookies(
            response.data.access_token,
            response.data.refresh_token
          );
        toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
          });
        router.push("/goals");
      }
    } catch (error) {
      console.log("Login failed", error);
      toast.error(
        "Login failed. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="w-full  h-screen flex flex-col p-0 m-0 justify-center items-center align-middle">
      <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4 w-[25%]">
        <FormGroup
          label="Email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          error={errors.email?.message}
        />

        <FormGroup
          label="Password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          error={errors.password?.message}
        />

        <Link
          className="text-sm text-gray-600 mb-3 block w-full text-right"
          href={"/register"}
        >
          <span className="text-blue-600 hover:text-blue-800">
          Don&apos;t have an account? Register here
          </span>
        </Link>

        <Button
          text="Login"
          onClick={() => {}}
          disabled={buttonDisabled}
          className="mt-4"
        />
      </form>
    </div>
  );
};

export default LoginForm;
