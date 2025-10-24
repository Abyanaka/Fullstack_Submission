const Persons = ({ show = [], onDelete }) => {
  // show: array of person objects
  const list = Array.isArray(show) ? show : []

  return (
    <div>
      <ul style={{ textAlign: 'left', paddingLeft: 0 }}>
        {list.map(p => (
          <li key={p.id} style={{ marginBottom: 6 }}>
            {p.name} {p.number}
            <button
              type="button"
              onClick={() => onDelete && onDelete(p.id, p.name)}
              style={{ marginLeft: 8 }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Persons