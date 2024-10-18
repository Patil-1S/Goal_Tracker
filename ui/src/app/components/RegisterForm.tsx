"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

enum GenderEnum {
  female = "Female",
  male = "Male",
  other = "Other",
}

enum CountryEnum {
  India = "India",
  Japan = "Japan",
  SriLanka = "SriLanka",
}

enum HobbiesEnum {
  Sports = "Sports",
  Music = "Music",
  Painting = "Painting",
}

interface IFormInput {
  name: string;
  mobile: string;
  gender: GenderEnum;
  country: CountryEnum;
  hobbies: HobbiesEnum;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    mobile: "",
    country: "",
    gender: "",
    hobbies: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users", user);
      console.log("Register success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Register failed", error);
    }
  };

  useEffect(() => {
    setButtonDisabled(
      !user.mobile || !user.email || !user.password || !user.name
    );
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="shadow-lg p-6 rounded-lg border-t-4 border-green-500 bg-white w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit(onRegister)} className="flex flex-col gap-4">
          <label className="font-semibold">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            id="name"
            type="text"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <label className="font-semibold">Mobile</label>
          <input
            {...register("mobile", { required: "Mobile is required" })}
            id="mobile"
            type="text"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          />

          <label className="font-semibold">Country</label>
          <select
            {...register("country", { required: true })}
            id="country"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={user.country}
            onChange={(e) => setUser({ ...user, country: e.target.value })}
          >
            <option value="">Select Country</option>
            <option value={CountryEnum.India}>{CountryEnum.India}</option>
            <option value={CountryEnum.Japan}>{CountryEnum.Japan}</option>
            <option value={CountryEnum.SriLanka}>{CountryEnum.SriLanka}</option>
          </select>

          <label className="font-semibold">Gender</label>
          <select
            {...register("gender", { required: true })}
            id="gender"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value={GenderEnum.female}>{GenderEnum.female}</option>
            <option value={GenderEnum.male}>{GenderEnum.male}</option>
            <option value={GenderEnum.other}>{GenderEnum.other}</option>
          </select>

          <label className="font-semibold">Hobbies</label>
          <select
            {...register("hobbies", { required: true })}
            id="hobbies"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={user.hobbies}
            onChange={(e) => setUser({ ...user, hobbies: e.target.value })}
          >
            <option value="">Select Hobbies</option>
            <option value={HobbiesEnum.Sports}>{HobbiesEnum.Sports}</option>
            <option value={HobbiesEnum.Music}>{HobbiesEnum.Music}</option>
            <option value={HobbiesEnum.Painting}>{HobbiesEnum.Painting}</option>
          </select>

          <label className="font-semibold">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            id="email"
            type="text"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label className="font-semibold">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            id="password"
            type="password"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="submit"
            className={`mt-4 bg-green-600 text-white font-bold py-2 rounded ${
              buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Please fill all fields" : "Register"}
          </button>

          <Link className="text-sm text-blue-600 hover:underline mt-2" href="/login">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
