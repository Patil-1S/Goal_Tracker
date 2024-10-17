"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label>Name</label>
          <input {...register("name", { required: true })} />
          <label>Mobile</label>
          <input {...register("mobile", { required: true })} />

          {/* <label>Country Selection</label> */}
          <select {...register("country", { required: true })}>
            <option value="">Select a country</option>
            <option value={CountryEnum.India}>{CountryEnum.India}</option>
            <option value={CountryEnum.Japan}>{CountryEnum.Japan}</option>
            <option value={CountryEnum.SriLanka}>{CountryEnum.SriLanka}</option>
          </select>

          {/* <label>Gender Selection</label> */}
          <select {...register("gender", { required: true })}>
            <option value="">Select gender</option>
            <option value={GenderEnum.female}>{GenderEnum.female}</option>
            <option value={GenderEnum.male}>{GenderEnum.male}</option>
            <option value={GenderEnum.other}>{GenderEnum.other}</option>
          </select>

          {/* <label>Hobbies Selection</label> */}
          <select {...register("hobbies", { required: true })}>
            <option value="">Select hobbies</option>
            <option value={HobbiesEnum.Sports}>{HobbiesEnum.Sports}</option>
            <option value={HobbiesEnum.Music}>{HobbiesEnum.Music}</option>
            <option value={HobbiesEnum.Painting}>{HobbiesEnum.Painting}</option>
          </select>

          <label>Email</label>
          <input {...register("email", { required: true })} />

          <label>Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
          />

          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
