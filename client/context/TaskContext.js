"use client";
import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";

const TaskContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";
export const TasksProvider = ({ children }) => {

    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState([]);
    const [priority, setPriority] = React.useState("All");

    // user id 
    const userId = useUserContext()?.user?._id;

    // get all tasks
    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/task/get-tasks`);
            setTask(response.data);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    // get single task 
    const getTask = async (taskId) => {
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
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    // update task 
    const updateTask = async (task) => {
        setLoading(true);
        try {
            const response = await axios.put(`${serverUrl}/task/update-task/${task._id}`, task);

            // update the task in the task array 
            const updatedTasks = tasks.map((tsk) => {
                return tsk._id === response.data._id ? response.data : tsk;
            })

            setTasks(updatedTasks);
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
            const newTasks = tasks.filter((task) => task._id !== taskId);
            setTasks(newTasks);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    useEffect(() => {
        getTasks();
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
            setPriority
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TaskContext);
}
