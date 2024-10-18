"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


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

  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    mobile: "",
    country:"",
    gender:"",
    hobbies:"",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/src/users", user);
      console.log("Register success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Register failed", error);
    } 
  };

  useEffect(() => {
    if (
      user.mobile.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label>Name</label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <label>Mobile</label>
          <input
            {...register("mobile", { required: true })}
            id="mobile"
            type="text"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          />

          {/* <label>Country Selection</label> */}
          <select
            {...register("country", { required: true })}
            id="country"
            value={user.country}
            onChange={(e) => setUser({ ...user, country: e.target.value })}
          >
            <option value="">Select a country</option>
            <option value={CountryEnum.India}>{CountryEnum.India}</option>
            <option value={CountryEnum.Japan}>{CountryEnum.Japan}</option>
            <option value={CountryEnum.SriLanka}>{CountryEnum.SriLanka}</option>
          </select>

          {/* <label>Gender Selection</label> */}
          <select
            {...register("gender", { required: true })}
            id="gender"
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <option value="">Select gender</option>
            <option value={GenderEnum.female}>{GenderEnum.female}</option>
            <option value={GenderEnum.male}>{GenderEnum.male}</option>
            <option value={GenderEnum.other}>{GenderEnum.other}</option>
          </select>

          {/* <label>Hobbies Selection</label> */}
          <select
            {...register("hobbies", { required: true })}
            id="hobbies"
            value={user.hobbies}
            onChange={(e) => setUser({ ...user, hobbies: e.target.value })}
          >
            <option value="">Select hobbies</option>
            <option value={HobbiesEnum.Sports}>{HobbiesEnum.Sports}</option>
            <option value={HobbiesEnum.Music}>{HobbiesEnum.Music}</option>
            <option value={HobbiesEnum.Painting}>{HobbiesEnum.Painting}</option>
          </select>

          <label>Email</label>
          <input
            {...register("email", { required: true })}
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label>Password</label>
          <input
            {...register("password", { required: true })}
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button onClick={onRegister} 
          className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            {buttonDisabled ? "No signup" : "Register"}
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
