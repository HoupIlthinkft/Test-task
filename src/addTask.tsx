import { useRef } from "react";
import { addTask } from "./requests.ts";

import Flatpickr from "react-flatpickr";

export function AddTaskComponent() {
    const header = useRef(null);
    const content = useRef(null);
    const priority = useRef(null);
    const deadline = useRef(null);

    const checkingAddTask = () => {
        if (header.current?.value.trim() == "") console.log("Invalid header");
            else if (content.current?.value.trim() == "") console.log("Invalid content");
                else if (priority.current?.value == null) console.log("Invalid priority");
                    else if (deadline.current?.value == "") console.log("Invalid date");
                        else addTask({
                            header: header.current?.value,
                            content: content.current?.value,
                            priority: priority.current?.value,
                            deadline: deadline.current?.value
                        })
    };

    return (
        <div className="flex flex-col gap-[clamp(10px,3vh,30px)] w-[100%] self-center items-center m-[20px]">
            <div className="flex flex-col gap-[clamp(5px,1vh,10px)]">
                <p className="font-semibold text-header text-[clamp(1rem,2.5vw,2.5rem)]">Заголовок</p>
                <input ref={header} placeholder="Введите заголовок..." className="bg-plate-task text-task-content text-[clamp(1rem,1.5vw,2rem)] rounded-[15px] outline-none w-[75vw] h-[8vh] px-[clamp(5px,1vw,20px)] py-[clamp(5px,2vh,20px)] "/>
            </div>
            <div className="flex flex-col gap-[clamp(5px,1vh,10px)]">
                <p className="font-semibold text-header text-[clamp(1rem,2.5vw,2.5rem)]">Содержание</p>
                <textarea ref={content} placeholder="Введите содеражние..." className="bg-plate-task text-task-content rounded-[15px] outline-none w-[75vw] min-h-[40vh] px-[clamp(5px,1vw,20px)] py-[clamp(5px,2vh,20px)] "/>
            </div>
            <div className="flex flex-col w-[75vw] gap-[clamp(5px,4vh,40px)] items-end">
                <div className="flex flex-row w-[100%] justify-between">
                    <div className="flex flex-row gap-[clamp(10px,1vw,20px)] bg-plate-accent px-[clamp(5px,2vw,30px)] py-[clamp(5px,2vh,20px)] rounded-[15px] hover:bg-plate-nav hover:text-hover-nav hover:scale-115 transition-all ease-in duration-300">
                        <span className="material-symbols-outlined h-fit scale-[2] self-center">skull_list</span>
                        <select ref={priority} className="text-[clamp(0.5rem,1.5vw,1.5rem)]">
                            <option value="high">Высокий</option>
                            <option value="medium">Средний</option>
                            <option value="low">Низкий</option>
                        </select>
                    </div>
                    <div className="flex flex-row bg-plate-accent px-[clamp(5px,2vw,30px)] py-[clamp(5px,2vh,20px)] rounded-[15px] hover:bg-plate-nav hover:text-hover-nav hover:scale-115 transition-all ease-in duration-300">
                        <span className="material-symbols-outlined scale-[2] h-fit self-center">calendar_add_on</span>
                        <Flatpickr 
                        ref={deadline}
                        options={{
                            minDate: "today",
                            altInput: true,
                            altFormat: 'F j, Y',
                            dateFormat: 'Y-m-d',
                            defaultDate: new Date(),
                        }}
                        className="text-center outline-none text-[clamp(0.5rem,1.5vw,1.5rem)]"/>
                
                    </div>
                </div>
                <div onClick={checkingAddTask} className="flex flex-row gap-[clamp(5px,1vw,20px)] px-[clamp(5px,2vw,30px)] py-[clamp(5px,2vh,20px)] rounded-[15px] outline-none bg-plate-accent hover:bg-plate-nav hover:text-hover-nav hover:scale-115 transition-all ease-in duration-300">
                    <span className="material-symbols-outlined h-fit scale-[3] self-center">add</span>
                    <p className="font-semibold text-[clamp(1rem,3vw,3rem)]">Добавить</p>
                </div>
            </div>
        </div>
    )
}
