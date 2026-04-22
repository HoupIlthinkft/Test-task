import { taskComponent } from "./task.tsx";

export function scheduleTodayComponent() {
    const data : taskIntf[] = getTasks(Date());
    
    return (
        <div>
            <p>Задачи на сегодня</p>
            <div>
                data.map((el, index) => (
                    <taskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={el.deadline}/>
                ))
            </div>
        </div>

        <div>
            <p>Топ задач на неделю</p>
            <div>
                {
                    data.map((el, index) => (
                        el.priority == "high" : <taskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={el.deadline}/> ? "" 
                    ))
                }
            </div>
        </div>
    )
}
