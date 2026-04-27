import { TaskComponent } from "./task.tsx";
import type { TaskIntf, TasksCollectionIntf } from "./config.ts";

export function HomeComponent({tasksWeekly} : {
    tasksWeekly: TasksCollectionIntf[];
}) {
    return (
        <div className="mx-[clamp(10px,2vw,40px)] self-center grid grid-cols-2 md:grid-cols-3 gap-x-[clamp(10px,1.5vw,30px)] gap-y-[clamp(10px,3vh,30px)]  overflow-y-auto w-fit h-fit max-h-[90vh] bg-plate-accent px-[clamp(10px,2vw,40px)] py-[clamp(10px,4vh,40px)] rounded-[20px]">
            {
                tasksWeekly.map((day : TasksCollectionIntf) => (
                    day.tasks.map((el : TaskIntf, index) => (
                        <TaskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={`${day.date} ${el.deadline}`}/>
                    ))
                ))
            }
        </div>
    )
}
