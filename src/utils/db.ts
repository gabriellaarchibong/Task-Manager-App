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
	deleteDoc,
	Unsubscribe,
	orderBy,
	getDoc,
	setDoc
} from "firebase/firestore"
import { User } from "firebase/auth";
// import toast from "react-hot-toast";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface TaskInput {
  body: string;
  priority: number; // e.g. 1 = High, 2 = Medium, 3 = Low
}

// src/utils/userDocumentUtils.ts
// import { User } from 'firebase/auth';
// import { doc, setDoc, getDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
// import { app } from '../firebase';


interface UserDocumentData {
  email: string;
  createdAt: Date;
  lastLogin: Date;
  displayName?: string;
  photoURL?: string;
  provider?: string;
  // Add any additional fields you need
}

export const createUserDocumentIfNotExists = async (user: UserData, provider: 'email' | 'google' = 'email') => {
  try {
    const userRef = doc(db, 'users', user.uid, 'userDetails', 'info');
    const userDoc = await getDoc(userRef);

    // Only create document if it doesn't exist
    if (!userDoc.exists()) {
      const userData: UserDocumentData = {
        email: user.email || '',
        createdAt: serverTimestamp() as unknown as Date,
        lastLogin: serverTimestamp() as unknown as Date,
        displayName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        provider
      };

      await setDoc(userRef, userData);
      console.log('New user document created');
      return { created: true, userRef };
    }

    // Update last login time if document exists
    await setDoc(userRef, {
      lastLogin: serverTimestamp()
    }, { merge: true });
    
    console.log('User document already exists - updated lastLogin');
    return { created: false, userRef };
  } catch (error) {
    console.error('Error managing user document:', error);
    throw error;
  }
};

export async function addTask(user: UserData, task: TaskInput): Promise<Task> {
	// await addUser({ uid: user.uid, email: user.email, displayName: user.displayName });

	if (!task.body.trim()) throw new Error("Task body is required");
	if (isNaN(task.priority)) throw new Error("Priority must be a number");
  
	const taskData = {
	  body: task.body,
	  priority: task.priority,
	  isCompleted: false,
	  createdAt: serverTimestamp(),
	};
  
	const docRef = await addDoc(collection(db, "users", user.uid, "tasks"), taskData);

	
	return {
		id: docRef.id,
		...taskData
	};
}

export const updateTaskStatus = async (userId: string, taskId:string, updatedTask: Partial<Task>): Promise<void> => {
	const taskRef = doc(db, "users", userId, "tasks", taskId);
	try {
		await updateDoc(taskRef, { ...updatedTask });
	} catch (error) {
		console.error("Error updating task status: ", error);	
	}
	
};

type TaskCallback = (tasks: Task[]) => void;

export function listenToTasks( userId: string, callback: TaskCallback ): Unsubscribe {
	const taskRef = collection(db, "users", userId, "tasks");
  	const q = query(taskRef, orderBy("priority", "asc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];

    callback(tasks);
  });

  return unsubscribe;
}

export async function deleteTask(userId:string, taskId: string): Promise<void> {
  if (!taskId) throw new Error("Task ID is required");

  const taskRef = doc(db, "users", userId, "tasks", taskId);
  await deleteDoc(taskRef);
}

// type User = {
// 		uid: string;
// 		email: string | null;
// 		displayName: string | null;
// 	};

// export const createUserDocument = async (user: User) => {
// 	try {
// 		const userRef = doc(db, "users", user.uid, "userDetails", "info");
// 		const userSnapshot = await getDoc(userRef);
// 		if (!userSnapshot.exists()) {
// 			await setDoc(userRef, {
// 				uid: user.uid,
// 				email: user.email,
// 				displayName: user.displayName,
// 				createdAt: serverTimestamp(),
// 			});
// 		}
		
// 	} catch (error) {
// 		console.error("Error creating user document:", error);
// 		throw new Error("Failed to create user document");
// 	}
	

// }

export const handleNewUser = async (user: UserData) => {
  const userRef = doc(db, "users", user.uid, "userDetails", "info");
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      provider: 'google',
      createdAt: new Date(),
      lastLogin: new Date()
    });
  } else {
    await setDoc(userRef, {
      lastLogin: new Date()
    }, { merge: true });
  }

}

interface UserDocument {
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: Date;
  lastLogin?: Date;
  provider?: string;
}


export const getUserDocument = async (userId: string): Promise<UserDocument | null> => {
  const docRef = doc(db, 'users', userId, 'userDetails', 'info');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as UserDocument : null;
};

export const createUserDocument = async (user: User, provider: string = 'email'): Promise<void> => {
  const userDoc: UserDocument = {
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'User',
    photoURL: user.photoURL || '',
    createdAt: serverTimestamp() as unknown as Date,
    lastLogin: serverTimestamp() as unknown as Date,
    provider
  };

  await setDoc(doc(db, 'users', user.uid), userDoc);
};

export const ensureUserDocumentExists = async (user: User, provider: string = 'email'): Promise<boolean> => {
  const existingDoc = await getUserDocument(user.uid);
  if (!existingDoc) {
    await createUserDocument(user, provider);
    return true; // Document was created
  }
  return false; // Document already existed
};

export const setAuthUser = (user: User, userDoc: UserDocument | null, isNewUser: boolean) => ({
  type: 'auth/setUser' as const,
  payload: {
    uid: user.uid,
    email: user.email,
    displayName: userDoc?.displayName || user.displayName,
    photoURL: userDoc?.photoURL || user.photoURL,
    isNewUser,
    createdAt: userDoc?.createdAt,
    lastLogin: userDoc?.lastLogin
  }
});

export const setAuthError = (error: string) => ({
  type: 'auth/setError' as const,
  payload: error
});

export const completeAuthLoading = () => ({
  type: 'auth/completeLoading' as const
});



