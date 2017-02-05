
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
        time: Date.now(),
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      console.log(state.completed);
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        todo(undefined, action),
        ...state,
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
          todo(t, action)
      );
    case 'DELETE_TODO':
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

export default todos;
