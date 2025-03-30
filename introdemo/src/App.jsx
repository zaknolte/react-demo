import { useState, useEffect } from 'react'
import phonebookAPI from './api/phonebook'
import loginAPI from './api/login'
import Person from './components/person'
import Message from './components/message'
import LoginForm from './components/loginForm'
import PhoneForm from './components/phoneForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginAPI.login({ username, password })
      // store credentials in local storage to remain on browser refresh
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      phonebookAPI.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const postPerson = async (newNumber, newName) => {
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
        <LoginForm loginUser={handleLogin} /> :
        <div>
          <p>{user.name} logged-in</p>
          <PhoneForm addPerson={postPerson} />
          <button onClick={handleLogout}>Logout</button>
          <h2>Numbers</h2>
          {persons.map((person => <Person key={person.id} person={person} onClick={() => deletePerson(person.id)} />))}
        </div>
      }

    </div>
  )
}

export default App