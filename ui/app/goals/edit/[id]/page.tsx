"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IGoal } from "../../page";
import { getTokenFromCookies } from "@/utils/cookies";

export default function EditGoal() {
  const router = useRouter();
  const { id } = useParams();
  const [goal, setGoal] = useState<IGoal | null>(null);

  const accessToken = getTokenFromCookies("access_token");

  useEffect(() => {
    if (id && accessToken) {
      fetch(`http://localhost:3000/goals/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setGoal(data));
    }
  }, [id, accessToken]);

  if (!goal) return <div>Loading...</div>;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setGoal((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleTaskCheckboxChange = (index: number, checked: boolean) => {
    const updatedTasks = [...goal.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: checked,
    };

    setGoal((prev) =>
      prev
        ? {
            ...prev,
            tasks: updatedTasks,
          }
        : null
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {
      id,
      createdAt,
      updatedAt,
      deletedAt,
      user,
      tasks,
      ...sanitizedGoal
    } = goal;

    const payload = {
      ...sanitizedGoal,
      progress: Number(sanitizedGoal.progress),
    };

    try {
      await tasks.map((task) =>
        fetch(`http://localhost:3000/goals/tasks/${task.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: task.completed }),
        })
      );

      const res = await fetch(`http://localhost:3000/goals/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/goals");
      } else {
        alert("Update failed");
      }

      if (!res.ok) {
        throw new Error("Failed to update goal");
      }

      alert("Goal updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong during update.");
    }
  };

  if (!goal) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Goal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Goal Title
          </label>
          <input
            id="title"
            name="title"
            value={goal.title}
            onChange={handleChange}
            placeholder="Goal Title"
            className="w-full border p-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={goal.description || ""}
            onChange={handleChange}
            placeholder="Goal Description"
            className="w-full border p-2"
          />
        </div>

        <div>
          <label htmlFor="status" className="block font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={goal.status}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div>
          <label htmlFor="progress" className="block font-medium mb-2">
            Progress
          </label>
          <input
            id="progress"
            type="number"
            name="progress"
            value={goal.progress}
            onChange={handleChange}
            placeholder="Progress"
            className="w-full border p-2"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={goal.category}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="HEALTH">HEALTH</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="CAREER">CAREER</option>
            <option value="FINANCE">FINANCE</option>
            <option value="PERSONAL">PERSONAL</option>
            <option value="TRAVEL">TRAVEL</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block font-medium mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={goal.priority}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className="block font-medium mb-2">
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            name="deadline"
            value={
              goal.deadline
                ? new Date(goal.deadline).toLocaleDateString("en-CA")
                : ""
            }
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Tasks</label>
          {goal.tasks && goal.tasks.length > 0 ? (
            goal.tasks.map((task, index) => (
              <div key={task.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onChange={(e) =>
                    handleTaskCheckboxChange(index, e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor={`task-${task.id}`} className="text-sm">
                  {task.task_title}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No tasks found</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Goal
        </button>
      </form>
    </div>
  );
}
