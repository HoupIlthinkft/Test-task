import { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "../node_modules/flatpickr/dist/flatpickr.css";

import { TaskComponent } from "./task.tsx";
import { getTasksForCustomRange } from "./requests.ts";

export function ScheduleCustomComponent(props) {

    const [rangeDate, setRangeDate] = useState([new Date(), new Date().fp_incr(7)]);

    const tasksCustom = props.tasksCustom

    useEffect(() => {
        if (rangeDate != null) getTasksForCustomRange(rangeDate);
    }, [rangeDate]);

    return (
        <div className="flex flex-col self-center gap-[clamp(5px,3vh,30px)] mx-[clamp(10px,2vw,40px)] my-[clamp(10px,4vh,40px)]">
            <div className="flex flex-row justify-between items-end">
                <p className="font-semibold text-[clamp(2rem,5vw,5rem)]">Входящие задачи</p>
                <div className="flex flex-col gap-[clamp(5px,2vh,20px)]">
                    <div className="font-semibold text-[clamp(1rem,2vw,2rem)] w-fit bg-plate-muted px-[clamp(5px,0.5vw,10px)] py-[clamp(5px,1vh,10px)] rounded-[10px]">
                        <Flatpickr 
                            options={{ 
                                mode: "range",
                                minDate: "today",
                                maxDate: new Date().fp_incr(30),
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                                defaultDate: [new Date(), new Date().fp_incr(7)],
                            }}
                            onChange={(selectedDates) => {
                                if (selectedDates.length == 2) setRangeDate(selectedDates);
                            }}
                        />
                    </div>
                    <div className="bg-plate-muted px-[clamp(5px,0.5vw,10px)] py-[clamp(5px,1vh,10px)] rounded-[10px]">
                        <i></i>
                        <p className="font-semibold text-center text-[clamp(1rem,2vw,2rem)]">Фильтрация</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 overflow-y-auto max-h-[60vh] bg-plate-accent rounded-[15px] px-[clamp(5px,2vw,40px)] py-[clamp(5px,4vh,40px)] gap-y-[clamp(5px,3vh,30px)] gap-x-[clamp(5px,2vw,30px)]">
                {
                    tasksCustom.map((day) => (
                        day.tasks.map((el, index) => (
                            <TaskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={el.deadline}/>
                        ))
                    ))
                }
            </div>
        </div>
    )
}
