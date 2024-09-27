import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
} from "../controllers/taskController.js/taskController.js";


const router = express.Router();

router.post("/task/create-task", protect, createTask);
router.get("/task/get-tasks", protect, getTasks);
router.get("/task/get-task/:id", protect, getTask);
router.put("/task/update-task/:id", protect, updateTask);
router.delete("/task/delete-task/:id", protect, deleteTask);


export default router;