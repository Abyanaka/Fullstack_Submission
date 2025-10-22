const Filter = (props) => {
    // console.log(props)
    return (
    <div>
        filter shown with <input
          onChange={props.onChange}
          value={props.value}
        />
    </div> 
    )
}

export default Filter