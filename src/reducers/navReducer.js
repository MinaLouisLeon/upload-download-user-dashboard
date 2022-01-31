const initialState = {
  page: "/",
  title: "Home",
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setNav":
      return {
        ...state,
        page: action.url,
        title: action.title,
      };
    default:
      return state;
  }
};

export default navReducer;
