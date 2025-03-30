const PhoneForm = ({
    handleSubmit,
    name,
    setname,
    number,
    setnumber
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>name: <input value={name} onChange={setname} /></div>
            <div>number: <input type='tel' value={number} onChange={setnumber} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PhoneForm