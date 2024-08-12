
const PetDetails = (props) => {
    // return if props.selected is null
    if (!props.selected)
      return (
        <div>
          <p>NO DETAILS</p>
        </div>
      );
  
    return (
      // return statement if props.selected has a truthy value
      <div>
        <h5>{props.selected.name}</h5>
        <p>Breed: {props.selected.breed}</p>
        <p>
          Age: {props.selected.age} year{props.selected.age > 1 ? 's' : ''} old
        </p>

        <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
        <button onClick={() => props.handleRemovePet(props.selected._id)}>Delete</button>
      </div>
    );
  };
  
  export default PetDetails;