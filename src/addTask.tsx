import { useRef, useState } from "react";
import { addTask } from "./requests.ts";

import { callNotifications } from "./notifications.tsx";
import Flatpickr from "react-flatpickr";

export function AddTaskComponent() {
    const header = useRef<HTMLInputElement | null>(null);
    const content = useRef<HTMLTextAreaElement | null>(null);
    const priority = useRef<HTMLSelectElement | null>(null);
    const deadlineStartRef = useRef<any>(null);
    const deadlineEndRef = useRef<any>(null);

    const [date, setDate] = useState<string>(new Date().toJSON());
    const [deadlineStart, setDeadlineStart] = useState("12:00");
    const [deadlineEnd, setDeadlineEnd] = useState("12:00");

    const checkingAddTask = () => {
        if (header.current?.value.trim() == "") callNotifications("error", "Не заполнено обязательное поле заголовок");
            else if (content.current?.value.trim() == "") callNotifications("error", "Не заполнено обязательное поле содержимое");
                else if (priority.current?.value == null) callNotifications("error", "Не выбран приоритет таска");
                        else addTask({
                            date: date,
                            task: {
                                    header: header.current?.value as string,
                                    content: content.current?.value as string,
                                    priority: priority.current?.value as "high" | "medium" | "low",
                                    deadline: `${deadlineStart}-${deadlineEnd}`,
                                }
                            }
                        );
    };

    return (
        <div className="flex flex-col gap-[clamp(10px,3vh,30px)] w-[100%] self-center items-center my-[clamp(5px,2vh,20px)] mx-[clamp(5px,1vw,20px)]">
            <div className="flex flex-col gap-[clamp(5px,1vh,10px)]">
                <p className="font-semibold text-header text-[clamp(1rem,2.5vw,2.5rem)]">Заголовок</p>
                <input ref={header} placeholder="Введите заголовок..." className="bg-plate-task text-task-content text-[clamp(1rem,1.5vw,2rem)] rounded-[15px] outline-none w-[75vw] h-[8vh] px-[clamp(5px,1vw,20px)] py-[clamp(5px,2vh,20px)] "/>
            </div>
            <div className="flex flex-col gap-[clamp(5px,1vh,10px)]">
                <p className="font-semibold text-header text-[clamp(1rem,2.5vw,2.5rem)]">Содержание</p>
                <textarea ref={content} placeholder="Введите содержание..." className="bg-plate-task text-task-content rounded-[15px] outline-none w-[75vw] min-h-[40vh] px-[clamp(5px,1vw,20px)] py-[clamp(5px,2vh,20px)] "/>
            </div>
            <div className="flex flex-col w-[75vw] gap-[clamp(5px,4vh,40px)] items-end">
                <div className="flex flex-row w-[100%] justify-between">
                    <div className="flex flex-row gap-[clamp(5px,1vw,20px)] h-fit bg-plate-accent px-[clamp(1px,2vw,30px)] py-[clamp(5px,1vh,20px)] md:py-[clamp(1px,2vh,20px)] rounded-[15px] hover:bg-plate-nav hover:text-hover-nav hover:scale-115 transition-all ease-in duration-300">
                        <span className="material-symbols-outlined h-fit scale-[1] xl:scale-[2] self-center">skull_list</span>
                        <select ref={priority} className="text-[clamp(0.5rem,1.5vw,1.5rem)]">
                            <option value="high">Высокий</option>
                            <option value="medium">Средний</option>
                            <option value="low">Низкий</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-[clamp(5px,2vh,20px)]">
                        <div className="flex flex-row bg-plate-accent px-[clamp(5px,2vw,30px)] py-[clamp(5px,1vh,10px)] md:py-[clamp(5px,2vh,20px)] rounded-[15px] hover:bg-plate-nav hover:text-hover-nav hover:scale-115 transition-all ease-in duration-300">
                            <span className="material-symbols-outlined scale-[1] xl:scale-[2] h-fit self-center">calendar_add_on</span>
                            <Flatpickr 
                            options={{
                                minDate: "today",
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                                defaultDate: new Date(),
                            }}
                            onValueUpdate={(selectedDates) => {setDate(new Date(selectedDates[0].setHours(new Date().getTimezoneOffset() / -60, 0, 0, 0)).toJSON())}}
                            className="text-center outline-none text-[clamp(0.5rem,1.5vw,1.5rem)]"/>
                        </div>
                        <div className="flex flex-row gap-[clamp(5px,2vw,40px)] justify-between"> 
                            <Flatpickr 
                            ref={deadlineStartRef}
                            options={{
                                noCalendar: true,
                                enableTime: true,
                                dateFormat: "H:i",
                                time_24hr: true,
                                defaultDate: deadlineStart,
                            }}
                            onValueUpdate={(selectedDates) => {
                                setDeadlineStart(selectedDates[0].toTimeString().slice(0,5));
                                if (deadlineStart > deadlineEnd) setDeadlineEnd(deadlineStart), deadlineEndRef.current.value = deadlineStart;
                            }}
                            className="text-center outline-none w-[20vw] md:w-auto text-[clamp(0.5rem,1vw,1rem)] bg-plate-accent py-[clamp(5px,1vh,10px)] rounded-[15px] hover:bg-plate-nav hover:text-hover-nav hover:scale-115 transition-all ease-in duration-300"
                            />
                            <Flatpickr
                            ref={deadlineEndRef}
                            options={{
                                noCalendar: true,
                                enableTime: true,
                                dateFormat: "H:i",
                                time_24hr: true,
                                defaultDate: deadlineEnd,
                            }}
                            onValueUpdate={(selectedDates) => {
                                setDeadlineEnd(selectedDates[0].toTimeString().slice(0,5));
                                if (deadlineStart > deadlineEnd) setDeadlineStart(deadlineEnd), deadlineStartRef.current.value = deadlineEnd;
                            }}
                            className="text-center outline-none w-[20vw] md:w-auto text-[clamp(0.5rem,1vw,1rem)] bg-plate-accent py-[clamp(5px,1vh,10px)] rounded-[15px] hover:bg-plate-nav hover:text-hover-nav hover:scale-115 transition-all ease-in duration-300"
                            />
                        </div>
                    </div>
                </div>
                <div onClick={checkingAddTask} role="button" className="flex flex-row gap-[clamp(5px,1vw,20px)] px-[clamp(5px,2vw,30px)] py-[clamp(5px,2vh,20px)] rounded-[15px] outline-none bg-plate-accent hover:bg-plate-nav hover:text-hover-nav hover:scale-115 transition-all ease-in duration-300">
                    <span className="material-symbols-outlined h-fit md:scale-[2] xl:scale-[3] self-center">add</span>
                    <p className="font-semibold text-[clamp(1rem,3vw,3rem)]">Добавить</p>
                </div>
            </div>
        </div>
    )
}
