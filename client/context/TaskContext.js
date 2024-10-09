"use client";
import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TaskContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";
export const TasksProvider = ({ children }) => {

    const [tasks, setTasks] = React.useState([]);
    console.log('tasks: ', tasks);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState([]);
    const [priority, setPriority] = React.useState("All");
    const [isEditing, setIsEditing] = React.useState(false);
    const [activeTask, setActiveTask] = React.useState(null);
    const [modalMode, setModalMode] = React.useState("");
    const [profileModal, setProfileModal] = React.useState(false);  // modal for profile


    const openModalForAdd = () => {
        setModalMode("add");
        setIsEditing(true);
        setTask({});
    }

    const openModalForEdit = (task) => {
        console.log("Editing task:", task);
        setModalMode("edit");
        setIsEditing(true);
        // setTasks(task);
        setActiveTask(task);
    }

    const openProfileModal = () => {
        setProfileModal(true);
    }

    const closeModal = () => {
        setIsEditing(false)
        setProfileModal(false)
        setModalMode("")
        setActiveTask(null)
        setTask({})
    }



    // user id 
    const userId = useUserContext()?.user?._id;

    // get all tasks
    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/task/get-tasks`);
            // console.log("response,", response.data.tasks);
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    // get single task 
    const getTask = async (taskId) => {
        // console.log('taskId: ', taskId);
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/task/get-task/${taskId}`);
            setTask(response.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    // create task 
    const createTask = async (task) => {
        setLoading(true);
        try {
            const response = await axios.post(`${serverUrl}/task/create-task`, task);
            setTask([...tasks, response.data]);
            toast.success("Task created successfully");
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    // update task 
    const updateTask = async (task) => {

        if (!task?.task || !task?.task._id) {
            console.log('task: ', task.task._id);
            console.error("Task or Task ID is undefined!");
            return; // Exit if there's no valid task or task ID
        }
        setLoading(true);
        try {

            console.log('Task data being sent:', task?.task);
            const response = await axios.put(`${serverUrl}/task/update-task/${task.task._id}`, task?.task);
            console.log('API response:', response.data);


            // Ensure tasks are defined before updating them
            if (!tasks?.tasks) {
                console.error("Tasks array is undefined!");
                return;
            }

            // update the task in the task array 
            const updatedTasks = tasks?.tasks?.map((tsk) => {
                return tsk._id === response.data.task._id ? response.data.task : tsk;
            })

            // Check if updatedTasks are properly constructed
            console.log('Updated tasks:', updatedTasks);

            setTasks(updatedTasks);
            toast.success("Task updated successfully");
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }


    // delete task
    const deleteTask = async (taskId) => {
        setLoading(true);
        try {
            await axios.delete(`${serverUrl}/task/delete-task/${taskId}`);

            // delete the task from the task array to update the state in realtime
            const newTasks = tasks.tasks.filter((task) => task._id !== taskId);
            setTasks(newTasks);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    const handleInput = (name) => (e) => {
        if (name === "setTask") {
            setTask(e);
        } else {
            setTask({ ...task, [name]: e.target.value });
        }
    }

    useEffect(() => {
        getTasks();
        console.log("useEffect called")
    }, [userId]);

    return (
        <TaskContext.Provider value={{
            tasks,
            loading,
            task,
            getTasks,
            getTask,
            createTask,
            updateTask,
            deleteTask,
            priority,
            setPriority,
            handleInput,
            isEditing,
            setIsEditing,
            openModalForAdd,
            openModalForEdit,
            modalMode,
            setModalMode,
            profileModal,
            setProfileModal,
            openProfileModal,
            activeTask,
            setActiveTask,
            closeModal

        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TaskContext);
}
