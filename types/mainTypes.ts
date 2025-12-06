import { Dispatch, SetStateAction } from "react";

export interface Task {
  id: any;
  isCompleted: boolean;
  name: string;
  desc: string;
  hour: number;
  minute: number;
  time: Date;
}

export interface RoutineTask {
  id: any;
  name: string;
  desc: string;
  streak: number;
  grid: boolean[][]; // 27 weeks × 7 days tracking history
  currentWeek: boolean[];
}

export type DateTimePickerMode = "date" | "time" | "datetime";

export type SortFunction = (tasks: Task[]) => Task[];

export interface TaskManagementProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export interface ModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

export interface AddPopUpProps extends TaskManagementProps, ModalProps {
  type: DateTimePickerMode;
  sortType: SortFunction;
}

export interface EditPopUpProps extends TaskManagementProps, ModalProps {
  task: Task;
  type: DateTimePickerMode;
}

export interface DTaskContainerProps extends TaskManagementProps {
  task: Task;
  cbToggle: (id: any) => void;
}

export interface STaskContainerProps extends TaskManagementProps {
  task: Task;
}

export interface AddTaskProps extends TaskManagementProps {}

export interface TextDivProps {
  name: string;
  desc: string;
  isCompleted: boolean;
}

export interface ScheTaskProps {
  name: string;
  desc: string;
  time: Date;
}

//====================================
// Routine 
//====================================

export interface RoutineTaskManagementProps {
  tasks: RoutineTask[];
  setTasks: Dispatch<SetStateAction<RoutineTask[]>>;
}

export interface AddRoutProps extends RoutineTaskManagementProps {}

export interface RoutAddProps extends RoutineTaskManagementProps, ModalProps {}

export interface EditRoutProps extends RoutineTaskManagementProps, ModalProps {
  task: RoutineTask;
}

export interface MissionDivProps {
  task: RoutineTask;
  today: number;
  cbToggle: (id: number) => void;
}

export interface StreakDivProps {
  task: RoutineTask;
  today: number;
  tasks: RoutineTask[];
  setTasks: Dispatch<SetStateAction<RoutineTask[]>>;
  cbToggle: (id: number) => void;
}

export interface TaskTextProps {
  name: string;
  desc: string;
  isCompleted: boolean;
}