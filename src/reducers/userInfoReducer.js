const initialState = {
  userInfo: null,
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUserInfo":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
