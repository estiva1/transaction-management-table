export const tableReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_DATA":
      return state.concat(action.payload);
    case "UPDATE_DATA":
      return state.concat([]);
    case "CLEAR_TABLE":
      return (state = []); // Fastest way to clear an existing array according to jsben.ch
    case "DELETE_ROW":
      let index = state.indexOf(action.payload);
      state.splice(index, 1);
      return state.concat([]); // without extra concat() function it will rerender only after page being changed - ???

    default:
      return state;
  }
};
