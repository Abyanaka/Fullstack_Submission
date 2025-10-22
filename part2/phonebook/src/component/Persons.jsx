const Persons = (props) => {
    return (
        <div>
        {props.show.map(p =><ul key={p.id}>{p.name} {p.number} </ul> )}
      </div>
    )
}

export default Persons