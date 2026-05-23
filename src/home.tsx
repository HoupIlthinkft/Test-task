import { TaskComponent } from "./task.tsx";
import type { TaskIntf, TasksCollectionIntf } from "./config.ts";

export function HomeComponent({
  tasksWeekly,
}: Readonly<{
  tasksWeekly: TasksCollectionIntf[];
}>) {
  return (
    <div className="flex flex-col gap-[clamp(5px,1vh,10px)] self-center max-h-[90vh] mx-[clamp(10px,2vw,40px)]">
      <p className="text-[clamp(2rem,7vw,7rem)] font-semibold text-hover-nav">
        Менеджер задач
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[clamp(10px,1.5vw,30px)] gap-y-[clamp(10px,3vh,30px)]  overflow-y-auto w-fit h-fit max-h-[80vh] bg-plate-accent px-[clamp(10px,2vw,40px)] py-[clamp(10px,4vh,40px)] rounded-[20px]">
        {tasksWeekly.map((day: TasksCollectionIntf) =>
          day.tasks.map((el: TaskIntf, index) => (
            <TaskComponent
              key={index}
              header={el.header}
              content={el.content}
              priority={el.priority}
              deadline={`${day.date} ${el.deadline}`}
            />
          )),
        )}
      </div>
    </div>
  );
}
