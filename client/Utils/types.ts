interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export type { Task};

