const Person = (props) => {
    return (
        <div style={{ display: 'flex' }}>
            <p key={props.person.name}>{props.person.name} {props.person.number}</p>
            <button onClick={props.onClick}>Delete</button>
        </div>
    )
}

export default Person