import asyncHandler from "express-async-handler";
import TaskModel from "../../models/task/TaskModel.js";
import mongoose from "mongoose";


// create task 

export const createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;

    // Validate required fields
    if (!title?.trim() || !description?.trim()) {
        return res.status(400).json({ message: "Title and description are required!" });
    }

    // Create a new task
    const task = new TaskModel({
        title,
        description,
        dueDate,
        priority,
        status,
        user: req.user._id
    });

    // Save the task to the database
    await task.save();

    res.status(201).json({ data: task, message: "Task created successfully" });
});


// get all tasks by user id

export const getTasks = asyncHandler(async (req, res) => {

    try {

        const userId = req.user._id;

        if (!userId) {

            return res.status(404).json({ message: "User not found" });
        }

        const tasks = await TaskModel.find({ user: userId });

        res.status(200).json({
            length: tasks.length,
            tasks
        }
        );

    } catch (error) {
        console.log('get tasks error', error);
        res.status(500).json({ message: "Cannot get tasks" });
    }
})

// get single task
export const getTask = asyncHandler(async (req, res) => {

    try {
        const userId = req.user._id;
        const { id } = req.params;

        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!id) {
            return res.status(404).json({ message: "Task id not found" });
        }

        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.user.equals(userId)) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        res.status(200).json(task);

    } catch (error) {
        console.log('get task error: ', error);
        res.status(500).json({ message: "Cannot get task" });
    }
})

// update task
export const updateTask = asyncHandler(async (req, res) => {

    try {

        const userId = req.user._id;
        const { id } = req.params;
        console.log('iddd: ', id);
        const { title, description, dueDate, priority, status, completed } = req.body;

        // Check if id is provided and is a valid ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid task ID" });
        }

        const task = await TaskModel.findById(id);

        // check if user owns the task
        if (!task.user.equals(userId)) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // update the task with the new values
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed || task.completed;

        // save the task to the database
        await task.save();

        return res.status(200).json(task);

    } catch (error) {

        console.log('update task error: ', error);
        res.status(500).json({ message: "Cannot update task" });
    }
})

// delete task by id 
export const deleteTask = asyncHandler(async (req, res) => {

    try {

        const userId = req.user._id;
        const { id } = req.params;

        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.user.equals(userId)) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        // delete the task
        await TaskModel.findByIdAndDelete(id);

        return res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {

        console.log('delete task error: ', error);
        res.status(500).json({ message: "Cannot delete task" });
    }
})