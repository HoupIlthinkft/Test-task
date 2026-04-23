import stub from "./assets/stub.json";
import type { TaskIntf, TasksCollectionIntf } from "./config.ts";


export async function getTasksOnThisWeekly() {
    const [start, end] : [string, string] = [new Date(), new Date().fp_incr(7)]
        .map(d => d.toLocaleDateString('ru-RU')) as [string, string];

    const response : TasksCollectionIntf[] = await getTasksForCustomRange([start, end]);

    return response;
}

export async function getTasksForCustomRange(selectedDates : [string, string]) {
    
    try {
        const response : TasksCollectionIntf[] = await fetch((`/api/tasks?${selectedDates[0]}-${selectedDates[1]}/`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                }
            }
        );
        
        if (!response.ok) {
            console.log(`Ошибка сервера: ${response.status}`);
            return -1;
        }
        
        return stub;
    } catch (error) {
        console.log("Ошибка загрузки тасков: " + error);
    }
}

export async function addTask(task : TaskIntf) {
    try {
        const response = await fetch(("/api/addTask"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                header: task.header,
                content: task.content,
                priority: task.priority,
                deadline: task.deadline,
            }),
        });

        if (!response.ok) {
            console.log(`Ошибка сервера: ${response.status}`);
        }

    } catch (error) {
        console.log(`Ошибка добавления таска: ${error}`);
    }
}

