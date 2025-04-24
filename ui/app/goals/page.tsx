"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearTokensFromCookies,
  clearUserFromCookies,
  getTokenFromCookies,
} from "@/utils/cookies";

export interface IGoal {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  progress: number;
  category: string;
  priority: string;
  deadline?: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  task_title: string;
  completed: boolean;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [dueStart, setDueStart] = useState("");
  const [dueEnd, setDueEnd] = useState("");
  const router = useRouter();

  const accessToken = getTokenFromCookies("access_token");

  const fetchGoals = async () => {
    if (!accessToken) return;

    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (status) params.append("status", status);
    if (dueStart) params.append("dueStart", dueStart);
    if (dueEnd) params.append("dueEnd", dueEnd);

    try {
      const res = await fetch(
        `http://localhost:3000/goals?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      setGoals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    const fetchGoals = async () => {
      const accessToken = getTokenFromCookies("access_token");

      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/goals", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();
        console.log("Data:", data);

        if (Array.isArray(data)) {
          setGoals(data);
        } else {
          console.warn("Invalid data format", data);
          setGoals([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchGoals();
  }, []);

  const handleLogout = () => {
    clearTokensFromCookies();
    clearUserFromCookies();
    window.location.href = "/login";
  };

  const handleDelete = async (goalId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/goals/${goalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete goal");
      }

      alert("Goal deleted successfully!");
      fetchGoals();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting the goal.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Goals Tracker</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Goals</h1>
          <button
            onClick={() => router.push("/goals/create")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + New Goal
          </button>
        </div>

        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1 w-full mt-7">
            <input
              type="text"
              placeholder="Search Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-full mt-8 ">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="dueStart" className="font-semibold">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              id="dueStart"
              type="date"
              placeholder="Start Date"
              value={dueStart}
              onChange={(e) => setDueStart(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="dueStart" className="font-semibold">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder="End Date"
              value={dueEnd}
              onChange={(e) => setDueEnd(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={() => fetchGoals()}
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 sm:col-span-2 lg:col-span-1"
          >
            Search
          </button>

          <button
            onClick={() => {
              setTitle("");
              setStatus("");
              setDueStart("");
              setDueEnd("");
              fetchGoals(); // fetch all again
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Progress</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Priority</th>
                <th className="p-2 border">Deadline</th>
                <th className="p-2 border">Tasks</th>
              </tr>
            </thead>

            <tbody>
              {goals.map((goal) => (
                <tr key={goal.id} className="text-center">
                  <td className="p-2 border">{goal.title}</td>
                  <td className="p-2 border">{goal.description}</td>
                  <td className="p-2 border">{goal.status}</td>
                  <td className="p-2 border">{goal.progress}%</td>
                  <td className="p-2 border">{goal.category}</td>
                  <td className="p-2 border">{goal.priority}</td>
                  <td className="p-2 border">
                    {goal.deadline
                      ? new Date(goal.deadline).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-2 border">
                    <ul className="list-disc list-inside text-left">
                      {goal.tasks && goal.tasks.length > 0 ? (
                        goal.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={
                              task.completed ? "text-green-600" : "text-red-600"
                            }
                          >
                            {task.task_title}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">No tasks</span>
                      )}
                    </ul>
                  </td>

                  <td className="p-2 border">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => router.push(`/goals/edit/${goal.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleDelete(goal.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {goals.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-gray-500">
                    No goals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
