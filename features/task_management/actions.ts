// "use server";

import { Task } from "./types";
import { addDocument, getCollection, getDocument, updateDocument, deleteDocument } from "@/services/utils";

const COLLECTION_NAME = "tasks";

const createTask = async (task: Task) => {
    // Persist task to Firestore
    await addDocument(COLLECTION_NAME, task, task.id);
    console.log("Task created:", task);
    return task;
}

const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    // Update in Firestore
    await updateDocument(COLLECTION_NAME, taskId, updatedTask as Partial<Task>);
}

const deleteTask = async (taskId: string) => {
    // Delete from Firestore
    await deleteDocument(COLLECTION_NAME, taskId);
}

const getTaskById = async (taskId: string): Promise<Task | null> => {
    const doc = await getDocument<Task>(COLLECTION_NAME, taskId);
    return doc;
}

const getAllTasks = async (): Promise<Task[]> => {
    const docs = await getCollection<Task>(COLLECTION_NAME);
    return docs.map(d => ({ ...d }));
}

export {
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getAllTasks,
};