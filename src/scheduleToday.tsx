import { TaskComponent } from "./task.tsx";
import type { TasksCollectionIntf, TaskIntf } from "./config.ts";

export function ScheduleTodayComponent({tasksOnToday, tasksWeekly} : {
    tasksOnToday: TasksCollectionIntf;
    tasksWeekly: TasksCollectionIntf[];
}) {
    
    return (
        <div className="flex flex-row gap-[2vw] mx-[clamp(5px,1.5vw,30px)] self-center">
            <div className="flex flex-col gap-[2vh] w-[60%] max-h-[50vh] rounded-[20px] px-[clamp(5px,1.5vw,30px)] py-[clamp(5px,3vh,30px)] bg-plate-accent">
                <p className="text-[clamp(1rem,2vw,2rem)] text-center font-semibold text-header">Задачи на сегодня</p>
                <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto  gap-x-[clamp(5px,1.5vw,30px)] gap-y-[clamp(5px,3vh,30px)]">
                    {
                        tasksOnToday.tasks.map((el : TaskIntf, index) => (
                            <TaskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={el.deadline}/>
                        ))
                    }
                </div>
            </div>

            <div className="flex flex-col gap-[2vh] w-[40%] max-h-[80vh] px-[clamp(5px,1.5vw,30px)] py-[clamp(5px,3vh,30px)] bg-plate-accent rounded-[20px]">
                <p className="text-[clamp(1rem,2vw,2rem)] font-semibold text-center text-header">Топ задач на неделю</p>
                <div className="flex flex-col gap-[clamp(5px,2vh,20px)] overflow-y-auto">
                    {
                        tasksWeekly.map((day : TasksCollectionIntf) => (
                            day.tasks.map((el : TaskIntf, index) => (
                                el.priority == "high" ? <TaskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={`${day.date} ${el.deadline}`}/> : "" 
                            ))
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
