import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form className="flex flex-col gap-3">
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Mobile" required />
          <select type="text" placeholder="gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select type="text" placeholder="Country" required>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="SriLanka">SriLanka</option>
            <option value="Japan">Japan</option>
            <option value="other">Other</option>
          </select>
          <select type="text" placeholder="Hobbies" required>
            <option value="">Select Hobbies</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Painting">Painting</option>
            <option value="other">Other</option>
          </select>
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            Error Message
          </div>

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account?{" "}
            <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
