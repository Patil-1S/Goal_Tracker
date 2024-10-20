"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
// import Link from "next/link";

interface ITaskInput {
  name: string;
  description: string;
  time: Date;
  status: "in progress" | "completed";
}

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskInput>();

  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      setAuthLoading(false); // User is authenticated
    }
  }, [router]);

  const onSubmit: SubmitHandler<ITaskInput> = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const result = await response.json();
      console.log("Task created successfully:", result.data);
      router.push("/tasklist");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Show nothing or a loading indicator while checking authentication
  if (authLoading) {
    return <div className="text-center p-5"></div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-green-400 w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Create New Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("name", { required: "Task name is required" })}
              placeholder="Task Name"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Description"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          <div>
            <input
              {...register("time", { required: "Time is required" })}
              type="datetime-local"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.time && (
              <span className="text-red-500 text-sm">{errors.time.message}</span>
            )}
          </div>

          <div>
            <select
              {...register("status", { required: "Status is required" })}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.status ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Status</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">{errors.status.message}</span>
            )}
          </div>

          <button
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md transition duration-300 ease-in-out hover:bg-green-700"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>

  );
}
