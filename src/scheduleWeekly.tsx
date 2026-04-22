import { taskComponent } from "./task.tsx";

export function scheduleWeeklyComponent() {
    const data : taskIntf[] = [];

    const dayOfTheWeek : string[] = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    
    return (
        <div>
        {
        data.map((tasks, index) => (
            <div key={index}>
                <p>{dayOfTheWeek[index]}</p>
                <div>
                    {
                        tasks == [] : <p>Задач нету</p> ? tasks.map((el, index) => (
                                                            <taskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={el.deadline}/>
                                                        ))
                    }
                </div>
            </div>
        ))
        }
        </div>
    )

}
