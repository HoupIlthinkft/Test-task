import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TaskIntf {
    header: string,
    content: string,
    priority: "low" | "medium" | "high",
    deadline: string,
}

interface TasksCollectionIntf {
    date: string,
    tasks: TaskIntf[],
}

export const useTasksStore = create(
    immer((set) => ({
        tasksOnWeeklyCollections: [],
        setTasksOnWeeklyCollections: (tasks) => set((state) => {state.tasksOnWeeklyCollections = tasks}),
        tasksCustomRangeCollections: [],
        setTasksCustomRangeCollections: (tasks) => set((state) => {state.tasksCustomRangeCollections = tasks}),
    }))
)

export type { TaskIntf, TasksCollectionIntf };
