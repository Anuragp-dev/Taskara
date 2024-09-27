import express from "express";
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask
} from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/task/create-task", protect, createTask);
router.get("/task/get-tasks", protect, getTasks);
router.get("/task/get-task/:id", protect, getTask);
router.put("/task/update-task/:id", protect, updateTask);
router.delete("/task/delete-task/:id", protect, deleteTask);


export default router;