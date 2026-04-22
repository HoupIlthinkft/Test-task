export function addTaskComponent() {
    return (
        <div>
            <div>
                <p>Заголовок</p>
                <input placeholder="Введите заголовок..."/>
            </div>
            <div>
                <p>Содержание</p>
                <input placeholder="Введите содеражние..."/>
            </div>
            <div>
                <div>
                    <select>
                        <options value="high">Высокий</options>
                        <options value="medium">Средний</options>
                        <options value="low">Низкий</options>
                    </select>
                    <input type="date" value="Укажите дедлайн" min={Date()}/>
                </div>
                <div>
                    <i></i>
                    <p>Добавить</p>
                </div>
            </div>
        </div>
    )
}
