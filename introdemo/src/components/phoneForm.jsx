import { useState } from 'react'

const PhoneForm = ({ addPerson }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addPerson(newName, newNumber)
        setNewName('')
        setNewNumber('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>name: <input value={newName} onChange={(e) => setName(e.target.value)} /></div>
            <div>number: <input type='tel' value={newNumber} onChange={(e) => setNumber(e.target.value)} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PhoneForm