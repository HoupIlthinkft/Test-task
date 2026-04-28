import stub from "./assets/stub.json";
import type { AddTaskIntf } from "./config.ts";

import { callNotifications } from "./notifications.tsx";

export async function getTasksOnThisWeekly() {
    const [start, end] : [string, string] = [new Date(new Date().setHours(new Date().getTimezoneOffset() / -60, 0, 0)).toJSON(), new Date(new Date().fp_incr(6).setHours(new Date().getTimezoneOffset() / -60, 0, 0)).toJSON()]

    const response = await getTasksForCustomRange([start, end]);

    return response;
}

export async function getTasksForCustomRange(selectedDates : [string, string]) {
    
    try {
        const response = await fetch((`/api/tasks?${selectedDates[0]}-${selectedDates[1]}/`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                }
            }
        );
        

        if (response.status == 404) return stub;



        if (!response.ok) {
            callNotifications("error", `Ошибка сервера: ${response.status}`);
            return null;
        } else callNotifications("success", "Таски загружены");
        
        return stub;
    } catch (error) {
        callNotifications("error",`Ошибка загрузки тасков: ${error}`);
    }
}

export async function addTask(body : AddTaskIntf) {
    try {
        const response = await fetch(("http://localhost/api/addTask"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: body.date,
                task: {
                    header: body.task.header,
                    content: body.task.content,
                    priority: body.task.priority,
                    deadline: body.task.deadline,
                }
            }),
        });

        if (!response.ok && response.status != 404) {
            callNotifications("error", `Ошибка сервера: ${response.status}`);
        } else callNotifications("success", "Таск добавлен в расписание");

    } catch (error) {
        callNotifications("error", `Ошибка добавления таска: ${error}`);
    }
}

