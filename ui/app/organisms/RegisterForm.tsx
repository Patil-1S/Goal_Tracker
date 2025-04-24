"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import FormGroup from "../molecules/FormGroup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { handleSubmit } = useForm<IFormInput>();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const onRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        user
      );
      console.log("Response:", response);
      if (response.status === 201) {
        toast.success("Registered successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                  });
        router.push("/login");
      }
      else{
        toast.error(
                "Registration Failed.",
                {
                  position: "top-right",
                  autoClose: 2000,
                }
              );
      }
    } catch (error) {
      console.log("Register failed", error);
      toast.error(
        "Registration Failed.",
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
    }
  };

  useEffect(() => {
    setButtonDisabled(!user.name || !user.email || !user.password);
  }, [user]);

  return (
    <div className="w-full  h-screen flex flex-col p-0 m-0 justify-center items-center align-middle">
      <form onSubmit={handleSubmit(onRegister)} className="flex flex-col gap-4 w-[25%]">
        <FormGroup
          label="Name"
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />
        <FormGroup
          label="Email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <FormGroup
          label="Password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        <Button
          text="Register"
          onClick={() => {}}
          disabled={buttonDisabled}
          className="mt-4"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
