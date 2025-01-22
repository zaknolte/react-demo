const Message = ({ message }) => {
    const messageStyle = {
        color: 'green',
        backgroundColor: 'lightgray',
        borderStyle: 'solid',
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    }
    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Message