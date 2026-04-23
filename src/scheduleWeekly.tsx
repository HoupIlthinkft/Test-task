import { TaskComponent } from "./task.tsx";

export function ScheduleWeeklyComponent(props) {
    const dayOfTheWeek : string[] = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    
    const tasksWeekly = props.tasksWeekly;

    return (
        <div className="flex flex-row gap-[clamp(5px,1vw,20px)] self-center overflow-x-auto px-[clamp(10px,2vw,40px)]">
        {
        tasksWeekly.map((day, index) => (
            <div key={index} className="flex flex-col gap-[clamp(5px,2vh,20px)] bg-plate-accent px-[clamp(5px,1vw,20px)] py-[clamp(5px,2vh,20px)] rounded-[12px] h-fit w-fit">
                <p className="text-header font-semibold text-[clamp(1rem,2vw,2rem)] text-center">{dayOfTheWeek[new Date(day.date).getDay()]}</p>
                <div className="flex flex-col gap-[clamp(5px,2vh,20px)] w-[20vw] max-h-[70vh] overflow-y-auto">
                    {
                        day.tasks[0] == undefined ? <p className="text-[clamp(1rem,2vw,2rem)] text-center text-content font-medium">Задач нету</p> : day.tasks.map((el, index) => (
                                                            <TaskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={el.deadline}/>
                                                        ))
                    }
                </div>
            </div>
        ))
        }
        </div>
    )

}
