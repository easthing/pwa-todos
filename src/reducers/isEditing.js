
const isEditing = (state = false, action) => {
  if (action.type === 'EDIT') {
    return action.bool;
  }
  return state;
}

export default isEditing;
