const PersonForm = (props) => {
    console.log(props)
    return (
        <form onSubmit={props.onSubmit}>
        <div> 
        name: <input 
        value={props.name}
        onChange={props.onNameChange}
        />
        </div>

        <div> 
        number: <input
        value={props.number}
        onChange={props.onNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
    )
}

export default PersonForm