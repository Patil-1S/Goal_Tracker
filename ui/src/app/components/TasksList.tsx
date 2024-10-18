"use client";

import { useEffect, useState } from "react";
import React from "react";

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/src/tasks?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data.tasks); // Adjust this based on your API response structure
        setTotalPages(data.totalPages); // Assuming your API returns totalPages
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Task List</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 rounded">
            <h2 className="font-bold">{task.name}</h2>
            <p>{task.description}</p>
            <p>
              <strong>Time:</strong> {new Date(task.time).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
