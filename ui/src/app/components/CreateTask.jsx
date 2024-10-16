// import Link from "next/link";

export default function CreateTask() {
  return (
    <div className="grid place-items-center h-screen">
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
      <h1 className="text-xl font-bold my-4">Create New Task</h1>
    <form className="flex flex-col gap-3">
      <input name="name" placeholder="Task Name" required />
      <div>
            <textarea name="description" placeholder="Description" 
            rows="4" cols="50" required ></textarea>
      </div>
      <input name="time" type="datetime-local" required />
      <select name="status">
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" 
      type="submit">Create</button>
    </form>
    </div>
    </div>
  );
}
