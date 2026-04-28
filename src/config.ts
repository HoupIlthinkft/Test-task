import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TaskIntf {
    header: string,
    content: string,
    priority: "low" | "medium" | "high",
    deadline: string,
}

interface AddTaskIntf {
    date: string,
    task: TaskIntf,
}

interface TasksCollectionIntf {
    date: string,
    tasks: TaskIntf[],
}

declare global {
    interface Date {
        fp_incr(days: number): Date;
    }
}

interface TasksStoreIntf {
    tasksOnWeeklyCollections: TasksCollectionIntf[];
    setTasksOnWeeklyCollections: (task : TasksCollectionIntf[]) => void;
    tasksCustomRangeCollections: TasksCollectionIntf[];
    setTasksCustomRangeCollections: (tasks : TasksCollectionIntf[]) => void;
}

interface NotificationStoreIntf {
    notificationActivity: boolean;
    setNotificationActivity: (activity : boolean) => void;
    notificationContent: {
        typeNotification: "error" | "success" | "";
        content: string;
    };
    setNotificationContent: (content : ["error" | "success", string]) => void
    
}

export const useTasksStore = create<TasksStoreIntf>()(
    immer((set) => ({
        tasksOnWeeklyCollections: [] as TasksCollectionIntf[],
        setTasksOnWeeklyCollections: (tasks : TasksCollectionIntf[]) => set((state) => {state.tasksOnWeeklyCollections = tasks}),
        tasksCustomRangeCollections: [] as TasksCollectionIntf[],
        setTasksCustomRangeCollections: (tasks : TasksCollectionIntf[]) => set((state) => {state.tasksCustomRangeCollections = tasks}),
    }))
)

export const useNotificationStore = create<NotificationStoreIntf>()(
    immer((set) => ({
        notificationActivity: false,
        setNotificationActivity: (activity) => set((state) => {state.notificationActivity = activity}),
        notificationContent: {
            typeNotification: "",
            content: "",
        },
        setNotificationContent: (content) => set((state) => {state.notificationContent = {typeNotification: content[0], content: content[1]}}),
    }))
)

export type { TaskIntf, TasksCollectionIntf, AddTaskIntf };
