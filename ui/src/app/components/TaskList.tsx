"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ITask {
  id: string;
  name: string;
  description: string;
  time: Date;
  status: "in progress" | "completed";
}

const ITEMS_PER_PAGE = 5;

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'None' | 'in progress' | 'completed'>('None');

  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); 
      console.log(status)
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
        setLoading(false); // End loading
      }
    };

    fetchTasks();
  }, [currentPage, status]); 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLogout = async () => {
    await router.push("/login");
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Task List</h1>
      
      <div className="mb-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'None' | 'in progress' | 'completed')}
          className="border p-2 rounded"
        >
          <option value="None">All</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="space-y-2">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="border p-3 rounded shadow-sm">
                <h2 className="font-bold">{task.name}</h2>
                <p>{task.description}</p>
                <p>
                  <strong>Time:</strong> {new Date(task.time).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
              </li>
            ))
          ) : (
            <li>No tasks available</li>
          )}
        </ul>
      )}
      
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded transition-colors ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 hover:bg-green-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
      <button onClick={handleLogout} className="mt-4 text-red-600 hover:underline">
        Logout
      </button>
    </div>
  );
}
