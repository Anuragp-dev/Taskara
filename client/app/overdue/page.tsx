"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { Task } from "@/Utils/types";
import { filteredTasks, overdueTasks } from "@/Utils/utilities";
import Filters from "../Components/filters/Filters";
import TaskItem from "../Components/TaskItem/TaskItem";
import { useEffect } from "react";
import { motion } from "framer-motion"
import { container, item } from "@/Utils/animations";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority, completedTasks } = useTasks();

  const overdue = overdueTasks(tasks)

  const filtered = filteredTasks(overdue, priority);


  useEffect(() => {
    setPriority("All");
  }, []);
  // console.log('tasks: ', tasks);
  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Overdue Tasks</h1>
        <Filters />
      </div>

      <motion.div className="pb-[20rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {
          filtered?.map((task: Task, i: number) => (
            <TaskItem key={i} task={task} />
          ))}
        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
           hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out "
          onClick={openModalForAdd}
          variants={item}
        >
          Add new Task
        </motion.button>

      </motion.div>
    </main>
  );
}
