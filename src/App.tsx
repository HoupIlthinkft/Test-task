import { useState, useEffect } from "react";
import "../node_modules/flatpickr/dist/themes/dark.css";

import { HomeComponent } from "./home.tsx";
import { AddTaskComponent } from "./addTask.tsx";
import { ScheduleTodayComponent } from "./scheduleToday.tsx";
import { ScheduleCustomComponent } from "./scheduleCustom.tsx";
import { ScheduleWeeklyComponent } from "./scheduleWeekly.tsx";

import { NavComponent } from "./navigation.tsx";
import { NotificationComponent } from "./notifications.tsx";

import { getTasksOnThisWeekly } from "./requests.ts";
import { useTasksStore } from "./config.ts";
import type { TaskCollectionIntf } from "./config.ts";

export default function App() {
    const [activePage, setActivePage] = useState(0);
    const [render, setRender] = useState(false);
    
    useEffect(() => {
        const loadTasks = async () => {
            const data : TaskCollectionIntf[] = await getTasksOnThisWeekly();

            useTasksStore.getState().setTasksOnWeeklyCollections(data);
            useTasksStore.getState().setTasksCustomRangeCollections(data);

            setRender(true);
        };

        if (!render) loadTasks();
    }, []);


    if (!render) return;

    const tasksWeekly : TaskCollectionIntf[] = useTasksStore.getState().tasksOnWeeklyCollections;
    const tasksCustom : TaskCollectionIntf[] = useTasksStore.getState().tasksCustomRangeCollections;
    

    const pages : string[] = ["Главная страница", "Расписание на сегодня", "Расписание на неделю", "Добавить задачу", "Выбрать даты"];
    
    const components : React.ReactElement[] = [
        <HomeComponent
            tasksWeekly={tasksWeekly}
        />,
        <ScheduleTodayComponent
            tasksOnToday={tasksWeekly[0]}
            tasksWeekly={tasksWeekly}
        />,
        <ScheduleWeeklyComponent
            tasksWeekly={tasksWeekly}
        />,
        <AddTaskComponent/>,
        <ScheduleCustomComponent 
            tasksCustom={tasksCustom}
        />,
    ];

    return (
        <>
            <NavComponent pages={pages} activePage={activePage} setActivePage={setActivePage} />
            {components[activePage]}
            <NotificationComponent />
        </>
    )
}
