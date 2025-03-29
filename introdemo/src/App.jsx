import { useState, useEffect } from 'react'
import phonebookAPI from './api/phonebook'
import loginAPI from './api/login'
import Person from './components/person'
import Message from './components/message'
import LoginForm from './components/loginForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const getPeople = async () => {
      const allPeople = await phonebookAPI.getAll()
      setPersons(allPeople)
    }
    getPeople()
  }, [])

  useEffect(() => {
    // get user credentials from local storage if already logged in
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      phonebookAPI.setToken(user.token)
    }
  }, [])

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
      // store credentials in local storage to remain on browser refresh
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      phonebookAPI.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const handleLogout = () => {
    try {
      setUser(null)
      window.localStorage.removeItem('loggedUser')
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Not logged in')
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const postPerson = async (e) => {
    e.preventDefault()
    let newPerson = persons.find((i) => i.name === newName)
    if (newPerson) {
      if (window.confirm(`${newName} already exists. Would you like to update the number?`)) {
        newPerson = await phonebookAPI.put(newPerson.id, { ...newPerson, number: newNumber })
        setPersons(persons.map(person => person.id === newPerson.id ? newPerson : person))
      }
    } else {
      newPerson = await phonebookAPI.post(
        {
          name: newName,
          number: newNumber
        }
      )
      setPersons(persons.concat(newPerson))
      setMessage(`${newName} added to phonebook!`)
      setTimeout(() => setMessage(null), 3000)
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = async (id) => {
    const deletedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Are you sure you want to delete ${deletedPerson.name}?`)) {
      try {
        const resp = await phonebookAPI.del(id)
        setPersons(persons.filter(person => person.id !== id))
      } catch (error) {
        setMessage(`${deletedPerson.name} may have already been deleted. Try refreshing your browser.`)
        setTimeout(() => setMessage(null), 5000)

      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {message ? <Message message={message} /> : <div></div>}

      {user === null ?
        <LoginForm onSubmit={handleLogin} setusername={(e) => setUsername(e.target.value)} setpassword={(e) => setPassword(e.target.value)} /> :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
          <button onClick={handleLogout}>Logout</button>
          <h2>Numbers</h2>
          {persons.map((person => <Person key={person.id} person={person} onClick={() => deletePerson(person.id)} />))}
        </div>
      }

    </div>
  )
}

export default App