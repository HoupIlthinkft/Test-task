export function TaskComponent(props) {
    return (
        <div className={`${props.className} flex flex-col gap-[clamp(6px,2vh,20px)] px-[clamp(8px,1vw,20px)] py-[clamp(10px,3vh,30px)] bg-plate-task rounded-[12px]`}>
            <h2 className="font-semibold text-task-header px-[clamp(5px,1vw,20px)] text-[clamp(0.5rem,2vw,1.5rem)]">{props.header}</h2>
            <p className="font-medium line-clamp-5 text-[clamp(0.25rem,1vw,1rem)] text-task-content">{props.content}</p>
            <div className="flex flex-row justify-between">
                <p className={`w-min text-priority-${props.priority} font-medium text-[clamp(0.5rem,1vw,1rem)]`}>{`Приориет: ${props.priority}`}</p>
                <p className="w-min font-medium text-[clamp(0.5rem,1vw,1rem)] text-task-content">{`Дедлайн: ${props.deadline}`}</p>
            </div>
        </div>
    )
}
