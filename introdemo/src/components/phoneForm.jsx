const PhoneForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>name: <input value={props.newName} onChange={props.setnewname} /></div>
            <div>number: <input type='tel' value={props.newNumber} onChange={props.setnewnumber} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PhoneForm