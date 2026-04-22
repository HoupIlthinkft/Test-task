import { useState } from "react";
import { Flatpickr } from "react-flatpickr";
import "../node_modules/flatpickr/dist/flatpickr.css";

import { taskComponent } from "./task.tsx";

export function scheduleCustomComponent() {

    const [rangeDate, setRangeDate] = useState(null);

    return (
        <div>
            <div>
                <p>Входящие задачи</p>
                <div>
                    <div>
                        <Flatpickr 
                            options={{ mode: "range" }}
                            value={rangeDate == null ? "Выберите даты" : rangeDate}
                            onChange={(selectedDates) => {
                                setRangeDate(selectedDates);
                            }}
                        />
                    </div>
                    <div>
                        <i></i>
                        <p>Фильтрация</p>
                    </div>
                </div>
            </div>
            <div>
                {
                    data.map((el, index) => (
                        <taskComponent key={index} header={el.header} content={el.content} priority={el.priority} deadline={el.deadline}/>
                    ))
                }
            </div>
        <div>
    )
}
