"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ITask {
  id: string;
  name: string;
  description: string;
  time: Date;
  status: "in progress" | "completed";
}

const ITEMS_PER_PAGE = 5;

const SkeletonLoader = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="border border-gray-300 p-4 rounded-lg bg-gray-200 animate-pulse">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded mb-1"></div>
        <div className="h-3 bg-gray-300 rounded mb-1"></div>
        <div className="h-3 bg-gray-300 rounded mb-1"></div>
      </div>
    ))}
  </div>
);

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [status, setStatus] = useState<"None" | "in progress" | "completed">("None");

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      setAuthLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (authLoading) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/tasks?page=${currentPage}&limit=${ITEMS_PER_PAGE}&status=${status}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data.rows);
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentPage, status, authLoading]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (authLoading) {
    return <div className="text-center p-5"></div>;
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Task List</h1>

      <div className="mb-4 flex justify-center">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "None" | "in progress" | "completed")}
          className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="None">All</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <ul className="space-y-4">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task.id}
                className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold">{task.name}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-700">
                  <strong>Time:</strong> {new Date(task.time).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {task.status}
                </p>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No tasks available</li>
          )}
        </ul>
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded-md transition-colors ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 hover:bg-green-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={handleLogout} className="text-red-600 hover:underline">
          Logout
        </button>
      </div>
    </div>
  );
}
