export function taskComponent(props) {
    return (
        <div key={props.key}>
            <h2>{props.header}</h2>
            <p>{props.content}</p>
            <div>
                <p>{props.priority}</p>
                <p>{props.deadline}</p>
            </div>
        </div>
    )
}
