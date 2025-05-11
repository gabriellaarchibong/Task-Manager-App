// Import the functions you need from the SDKs you need
import { db } from "./firestore";
import type { Task } from "../types";
import { 
	collection,
	addDoc, 
	serverTimestamp,
	doc,
	updateDoc,
	query,
	onSnapshot,
	orderBy,
	deleteDoc,
} from "firebase/firestore"

export async function addTask(body: string, priority: number): Promise<Task> {
	if (!body.trim()) throw new Error("Task body is required");
	if (isNaN(priority)) throw new Error("Priority must be a number");
  
	const taskData = {
	  body,
	  priority,
	  isCompleted: false,
	  createdAt: serverTimestamp(),
	};
  
	const docRef = await addDoc(collection(db, "tasks"), taskData);
	
	return {
		id: docRef.id,
		...taskData
	};
  }

export const updateTaskStatus = async (id: string, isCompleted: boolean): Promise<void> => {
	const taskRef = doc(db, "tasks", id);
	await updateDoc(taskRef, { isCompleted });
};

type TaskCallback = (tasks: Task[]) => void;

export function listenToTasks(callback: TaskCallback): () => void {
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];

    callback(tasks);
  });

  return unsubscribe;
}

export async function deleteTask(taskId: string): Promise<void> {
  if (!taskId) throw new Error("Task ID is required");

  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}

