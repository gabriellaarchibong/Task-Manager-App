import { Timestamp, FieldValue } from "firebase/firestore";

export type Props = {
	children: React.ReactNode;
}
export type TTask = {
	id: number;
	body: string;
	priority: number;
	completed: boolean;
};

export type TaskItemProps = {
	id: string;
	body: string;
	priority: number;
	isCompleted: boolean;
	onCheck: (value: boolean) => void;
	onDelete: () => void;
};
export type Task = {
	id: string;
	body: string;
	priority: number;
	isCompleted: boolean
	createdAt: Timestamp | FieldValue
};