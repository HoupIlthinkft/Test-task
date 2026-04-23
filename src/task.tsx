export function TaskComponent(props) {
    return (
        <div className={`${props.className} flex flex-col gap-[clamp(6px,1vh,12px)] px-[clamp(8px,2vw,16px)] py-[clamp(10px,2vh,21px)] bg-plate-task rounded-[12px]`}>
            <h2 className="font-semibold  text-[clamp(0.3rem,1.25vw,1.25rem)]">{props.header}</h2>
            <p className="font-medium line-clamp-5 text-[clamp(0.25rem,1vw,1rem)] text-content">{props.content}</p>
            <div className="flex flex-row justify-between">
                <p className={`w-min text-priority-${props.priority} font-medium text-[clamp(0.5rem,1vw,1rem)]`}>{`Приориет: ${props.priority}`}</p>
                <p className="w-min font-medium text-[clamp(0.5rem,1vw,1rem)] text-content">{`Дедлайн: ${props.deadline}`}</p>
            </div>
        </div>
    )
}
