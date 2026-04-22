import { taskComponent } from "./task.tsx";


interface taskIntf {
    header: string,
    content: string,
    priority: "low" | "medium" | "high",
    deadline: string,
}

export function homeComponent() {
    const data : taskIntf[] = [];

    return (
        <div>
            {
                data.map((el, index) => (
                    <taskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={el.deadline}/>
                ))
            }
        </div>
    )
}
