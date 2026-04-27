import { useState } from "react";

export function TaskComponent({header, content, priority, deadline} : {
    header: string; 
    content: string; 
    priority: "high" | "medium" | "low"; 
    deadline: string;
}) {
    const [viewTask, setViewTask] = useState<boolean>(false);

    return (
        <div onClick={() => setViewTask(!viewTask)} className={'flex flex-col gap-[clamp(6px,2vh,20px)] cursor-pointer px-[clamp(8px,1vw,20px)] py-[clamp(10px,3vh,30px)] bg-plate-task rounded-[12px]'}>
            <h2 className="font-semibold text-task-header px-[clamp(5px,1vw,20px)] text-[clamp(0.5rem,2vw,1.5rem)]">{header}</h2>
            <p className="font-medium line-clamp-5 text-[clamp(0.25rem,1vw,1rem)] text-task-content">{content}</p>
            <div className="flex flex-row justify-between">
                <p className={`w-min text-priority-${priority} font-medium text-[clamp(0.5rem,1vw,1rem)]`}>{`Приориет: ${priority}`}</p>
                <p className="w-min font-medium text-[clamp(0.5rem,1vw,1rem)] text-task-content">{`Дедлайн: ${deadline}`}</p>
            </div>
                {
                    viewTask ? (
                        <div className="absolute z-4 cursor-default w-[100vw] h-[100vh] top-[0%] left-[0%] flex items-center justify-center bg-black/66">
                            <div className="flex flex-col w-fit max-w-[60vw] h-fit gap-[clamp(5px,4vh,40px)] px-[clamp(10px,2vw,30px)] py-[clamp(10px,3vh,30px)] self-center justify-self-center bg-plate-task rounded-[12px]">
                                <span onClick={() => setViewTask(!viewTask)} className="material-symbols-outlined cursor-pointer self-end scale-[2] hover:text-hover-nav hover:scale-210 transition-all duration-250 ease-in">close</span>
                                <div className="flex flex-col gap-[clamp(5px,4vh,40px)] h-[100%] justify-between">
                                    <h2 className="font-semibold text-task-header px-[clamp(5px,1vw,20px)] text-[clamp(0.5rem,2vw,2rem)]">{header}</h2>
                                    <p className="font-medium text-[clamp(0.5rem,1.5vw,1.5rem)] text-task-content max-h-[40vh] overflow-y-auto">{content}</p>
                                    <div className="flex flex-row justify-between">
                                        <p className={`w-min text-priority-${priority} font-medium text-[clamp(0.5rem,1vw,1rem)]`}>{`Приориет: ${priority}`}</p>
                                        <p className="w-min font-medium text-[clamp(0.5rem,1vw,1rem)] text-task-content">{`Дедлайн: ${deadline}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""
                }
        </div>
    )
}
