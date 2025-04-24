"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IGoal } from "../page";
import { getTokenFromCookies } from "@/utils/cookies";

export default function CreateGoal() {
  const router = useRouter();

  const [goal, setGoal] = useState({
    title: "",
    description: "",
    status: "PENDING",
    progress: 0,
    deadline: "",
    tasks: [{ task_title: "", completed: false }],
    category: "PERSONAL",
    priority: "MEDIUM",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (index: number, field: string, value: any) => {
    const updatedTasks = [...goal.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: field === "completed" ? value.target.checked : value,
    };
    setGoal({ ...goal, tasks: updatedTasks });
  };

  const addTask = () => {
    setGoal({
      ...goal,
      tasks: [...goal.tasks, { task_title: "", completed: false }],
    });
  };

  const removeTask = (index: number) => {
    const updatedTasks = goal.tasks.filter((_, i) => i !== index);
    setGoal({ ...goal, tasks: updatedTasks });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const accessToken = getTokenFromCookies("access_token");

    const res = await fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(goal),
    });

    if (res.ok) {
      router.push("/goals");
    } else {
      const err = await res.json();
      console.error("Error creating goal:", err);
      alert("Failed to create goal");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Create New Goal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={goal.title}
            onChange={handleChange}
            placeholder="Goal Title"
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={goal.description}
            onChange={handleChange}
            placeholder="Describe your goal"
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={goal.status}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option>PENDING</option>
            <option>IN_PROGRESS</option>
            <option>COMPLETED</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Progress (%)</label>
          <input
            type="number"
            name="progress"
            value={goal.progress}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={goal.deadline}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tasks</label>
          {goal.tasks.map((task, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Task title"
                value={task.task_title}
                onChange={(e) =>
                  handleTaskChange(index, "task_title", e.target.value)
                }
                className="flex-1 border p-2"
              />
              <button
                type="button"
                onClick={() => removeTask(index)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTask}
            className="text-blue-600 underline mt-2"
          >
            + Add Task
          </button>
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={goal.category}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option>HEALTH</option>
            <option>EDUCATION</option>
            <option>CAREER</option>
            <option>FINANCE</option>
            <option>PERSONAL</option>
            <option>TRAVEL</option>
            <option>OTHER</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={goal.priority}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Goal
        </button>
      </form>
    </div>
  );
}
