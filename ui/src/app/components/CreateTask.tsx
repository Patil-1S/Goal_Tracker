"use client";

import { useForm, SubmitHandler } from "react-hook-form";

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

  const onSubmit: SubmitHandler<ITaskInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Create New Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register("name", { required: "Task name is required" })}
            placeholder="Task Name"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}

          <input
            {...register("time", { required: "Time is required" })}
            type="datetime-local"
          />
          {errors.time && (
            <span className="text-red-500">{errors.time.message}</span>
          )}

          <select {...register("status", { required: "Status is required" })}>
            <option value="">Select Status</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <span className="text-red-500">{errors.status.message}</span>
          )}

          <button
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
