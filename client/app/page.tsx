"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "./Components/filters/Filters";

export default function Home() {
  useRedirect("/login");

  const {task} = useTasks();
  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          All Tasks
        </h1>
        <Filters/>
      </div>
    </main>
  );
}
