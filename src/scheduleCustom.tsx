import { useState, useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";

import { TaskComponent } from "./task.tsx";
import { getTasksForCustomRange } from "./requests.ts";

import type { TasksCollectionIntf, TaskIntf } from "./config.ts";

export function ScheduleCustomComponent({tasksCustom} : {
    tasksCustom: TasksCollectionIntf[];
}) {

    const [rangeDate, setRangeDate] = useState<Date[] | null>(null);

    const [sortingMenuOpen, setSortingMenuOpen] = useState<boolean>(false);
    const rangeCalendar = useRef<any>(null);

    const [sorting, setSorting] = useState<"unSorted" | "sorted" | "revSorted">("unSorted");
    const [sortedHigh, setSortedHigh] = useState<boolean>(true);
    const [sortedMedium, setSortedMedium] = useState<boolean>(true);
    const [sortedLow, setSortedLow] = useState<boolean>(true);


    useEffect(() => {
        if (rangeDate != null) getTasksForCustomRange([new Date(rangeDate[0].setHours(new Date().getTimezoneOffset() / -60, 0, 0)).toJSON(), new Date(rangeDate[1].setHours(new Date().getTimezoneOffset() / -60, 0, 0)).toJSON()]);
    }, [rangeDate]);


    return (
        <div className="flex flex-col self-center w-[90vw] gap-[clamp(5px,3vh,30px)] mx-[clamp(10px,2vw,40px)] my-[clamp(10px,4vh,40px)]">
            <div className="flex flex-row justify-between items-end">
                <p className="font-semibold text-header text-[clamp(2rem,5vw,5rem)]">Входящие задачи</p>
                <div className="flex flex-col gap-[clamp(5px,2vh,20px)]">
                    <div className="flex flex-row gap-[clamp(5px,1vw,20px)] font-semibold text-[clamp(1rem,2vw,2rem)] cursor-pointer w-fit bg-plate-muted px-[clamp(5px,1vw,20px)] py-[clamp(5px,1vh,10px)] rounded-[10px] hover:bg-plate-nav hover:text-hover-nav hover:scale-110 transition-all duration-300 ease-in">
                        <span className="material-symbols-outlined self-center h-fit scale-[1] xl:scale-[2]">date_range</span>
                        <Flatpickr 
                            className="text-center outline-none max-w-[20vw] cursor-pointer text-[clamp(0.75rem,2vw,2rem)]"
                            ref={rangeCalendar}
                            options={{ 
                                mode: "range",
                                minDate: "today",
                                maxDate: new Date().fp_incr(30),
                                defaultDate: [new Date(new Date().setHours(new Date().getTimezoneOffset() / -60, 0, 0)).toJSON(), new Date(new Date().fp_incr(6).setHours(new Date().getTimezoneOffset() / -60, 0, 0)).toJSON()],
                                altInput: true,
                                altFormat: 'F j',
                                dateFormat: 'Y-m-d',
                            }}
                            onChange={(selectedDates : Date[]) => {
                                if (selectedDates.length == 2) setRangeDate(selectedDates);
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-[clamp(5px,1vh,10px)] bg-plate-muted px-[clamp(5px,1vw,20px)] py-[clamp(5px,1vh,10px)] rounded-[10px] hover:bg-plate-nav hover:text-hover-nav hover:scale-110 transition-all duration-300 ease-in">
                        <div onClick={() => setSortingMenuOpen(!sortingMenuOpen)} className="flex flex-row gap-[clamp(5px,1vw,20px)] cursor-pointer">
                            <span className="material-symbols-outlined self-center w-min h-fit scale-[1] xl:scale-[2]">filter_alt</span>
                            <p className="font-semibold text-center w-[100%] self-center text-[clamp(0.75rem,2vw,2rem)]">Фильтрация</p>
                        </div>
                        {
                            sortingMenuOpen ? (
                                <div className="flex flex-col gap-[clamp(5px,1vh,10px)]">
                                    <div onClick={() => {
                                        sorting == "sorted" ? setSorting("revSorted") : (
                                                                                    sorting == "revSorted" ? setSorting("unSorted") : setSorting("sorted"))
                                    }} className="flex flex-row gap-[clamp(5px,0.5vw,10px)] cursor-pointer">
                                        <span className={`material-symbols-outlined ${sorting == "revSorted" ? "xl:scale-[-2] md:scale-[-1]" : "xl:scale-[2] md:scale-[1]"} self-center`}>{
                                            sorting == "sorted" || sorting == "revSorted" ? "sort" : "menu"
                                        }</span>
                                        <p className="font-semibold text-[clamp(0.75rem,2vw,2rem)]">Приоритет</p>
                                    </div>
                                    <div className="flex flex-col gap-[5px,1vh,10px]">
                                        <div onClick={() => setSortedHigh(!sortedHigh)} className="flex flex-row gap-[clamp(10px,2vw,30px)] justify-between cursor-pointer">
                                            <p className="font-medium text-[clamp(0.75rem,1.5vw,2rem)]">Высокий</p>
                                            <span className="material-symbols-outlined md:scale-[1] xl:scale-[2] self-center">{sortedHigh ? "select_check_box" : "check_box_outline_blank"}</span>
                                        </div>
                                        <div onClick={() => setSortedMedium(!sortedMedium)} className="flex flex-row gap-[clamp(10px,2vw,30px)] justify-between cursor-pointer">
                                            <p className="font-medium text-[clamp(0.75rem,1.5vw,2rem)]">Средний</p>
                                            <span className="material-symbols-outlined md:scale-[1] xl:scale-[2] self-center">{sortedMedium ? "select_check_box" : "check_box_outline_blank"}</span>
                                        </div>
                                        <div onClick={() => setSortedLow(!sortedLow)} className="flex flex-row gap-[clamp(10px,2vw,30px)] justify-between cursor-pointer">
                                            <p className="font-medium text-[clamp(0.75rem,1.5vw,2rem)]">Низкий</p>
                                            <span className="material-symbols-outlined md:scale-[1] xl:scale-[2] self-center">{sortedLow ? "select_check_box" : "check_box_outline_blank"}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : ""
                        }
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 overflow-y-auto min-h-[30vh] md:min-h-[40vh] max-h-[50vh] bg-plate-accent rounded-[15px] px-[clamp(5px,2vw,40px)] py-[clamp(5px,4vh,40px)] gap-y-[clamp(5px,3vh,30px)] gap-x-[clamp(5px,2vw,30px)]">
                {
                    sortingTask(
                    tasksCustom.flatMap((day : TasksCollectionIntf, indexTop) => (
                        day.tasks.map((el : TaskIntf, indexBottom) => (
                            sortedHigh && "high" == el.priority.toLowerCase() || sortedMedium && "medium" == el.priority.toLowerCase() || sortedLow && "low" == el.priority.toLowerCase() ? (
                            <TaskComponent key={String(indexTop) + String(indexBottom)} header={el.header} content={el.content} priority={el.priority} deadline={`${day.date} ${el.deadline}`}/>
                            ) : ""
                        ))
                    )), sorting)
                }
            </div>
        </div>
    )
}


function sortingTask(tasks : any, rule : "sorted" | "revSorted" | "unSorted") {
    if (rule == "unSorted") return tasks;
    else {
        let low : number = 0;
        let mid : number = 0;
        let high : number = tasks.length - 1;
        
        while (mid <= high) {
            if (tasks[mid]?.props?.priority == "low") {
                tasks[low], tasks[mid] = tasks[mid], tasks[low];
                low += 1;
                mid += 1;
            }
            else if (tasks[mid]?.props?.priority == "medium") mid += 1;
            else {
                [tasks[mid], tasks[high]] = [tasks[high], tasks[mid]];
                high -= 1;
            }
        }
        return rule == "sorted" ? tasks.reverse() : tasks;
    }
}
