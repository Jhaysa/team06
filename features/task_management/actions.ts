// "use server";

import { Task } from "./types";
import { addDocument, getCollection, getDocument, updateDocument, deleteDocument } from "@/services/utils";

const COLLECTION_NAME = "tasks";

/**
 * Create a new task with a custom ID
 */
const createTask = async (task: Task) => {
  await addDocument(COLLECTION_NAME, task, task.id);
  console.log("Task created:", task);
  return task;
};

/**
 * Update an existing task
 */
const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
  await updateDocument(COLLECTION_NAME, taskId, updatedTask);
};

/**
 * Delete a task
 */
const deleteTask = async (taskId: string) => {
  await deleteDocument(COLLECTION_NAME, taskId);
};

/**
 * Get a task by ID
 */
const getTaskById = async (taskId: string): Promise<Task | null> => {
  const doc = await getDocument<Task>(COLLECTION_NAME, taskId);
  return doc;
};

/**
 * Get all tasks
 */
const getAllTasks = async (): Promise<Task[]> => {
  const docs = await getCollection<Task>(COLLECTION_NAME);
  return docs.map((d) => ({ ...d }));
};

export { createTask, updateTask, deleteTask, getTaskById, getAllTasks };
