import createDataContext from "./createDataContext";
const userReducer = (state, action) => {
  switch (action.type) {
    case "update_userid": {
      return { ...state, userId: action.payload };
    }
    default:
      return state;
  }
};
const updateUserId = (dispatch) => {
  return (userId) => {
    dispatch({ type: "update_userid", payload: userId });
  };
};
export const { Context, Provider } = createDataContext(
  userReducer,
  { updateUserId },
  { userId: "", defaultAddress: [] }
);
