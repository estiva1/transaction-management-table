export const filterReducer = (state = "", action) => {
    switch (action.type) {
      case "FILTER_TEXT":
        return action.text;
  
      default:
        return state;
    }
  };