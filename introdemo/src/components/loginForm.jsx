const LoginForm = ({
    handleLogin,
    username,
    setusername,
    password,
    setpassword
}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input type="text" value={username} name="Username" onChange={setusername} />
            </div>
            <div>
                password
                <input type="password" value={password} name="Password" onChange={setpassword} />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm