import { useState, useEffect } from 'react'
import phonebookAPI from './api/phonebook'
import loginAPI from './api/login'
import Person from './components/person'
import Message from './components/message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    phonebookAPI.getAll()
      .then(allPeople => {
        setPersons(allPeople)
      })
  }, [])

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          password
          <input type="password" value={password} name="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const noteForm = () => {
    return (
      <form onSubmit={postPerson}>
        <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></div>
        <div>number: <input type='tel' value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
        <div><button type="submit">add</button></div>
      </form>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginAPI.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const postPerson = (e) => {
    e.preventDefault()
    const newPerson = persons.find((i) => i.name === newName)
    if (newPerson) {
      if (window.confirm(`${newName} already exists. Would you like to update the number?`)) {
        phonebookAPI.put(newPerson.id, { ...newPerson, number: newNumber })
          .then(newPerson => setPersons(persons.map(person => person.id === newPerson.id ? newPerson : person)))
      }
    } else {
      phonebookAPI.post(
        {
          name: newName,
          number: newNumber
        }
      )
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
      setMessage(`${newName} added to phonebook!`)
      setTimeout(() => setMessage(null), 3000)
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (id) => {
    const deletedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Are you sure you want to delete ${deletedPerson.name}?`)) {
      phonebookAPI.del(id)
        .then(
          setPersons(persons.filter(person => person.id !== id))
        ).catch((error) => {
          setMessage(`${deletedPerson.name} may have already been deleted. Try refreshing your browser.`)
          setTimeout(() => setMessage(null), 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {message ? <Message message={message} /> : <div></div>}

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }

      <h2>Numbers</h2>

      {persons.map((person => <Person key={person.id} person={person} onClick={() => deletePerson(person.id)} />))}
    </div>
  )
}

export default App