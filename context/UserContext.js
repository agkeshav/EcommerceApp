import createDataContext from "./createDataContext";
const userReducer = (state, action) => {
  switch (action.type) {
    case "update_userid": {
      return { ...state, userId: action.payload };
    }
    case "update_defaultAddress": {
      return { ...state, defaultAddress: action.payload };
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
const updateDefaultAddress = (dispatch) => {
  return (item) => {
    dispatch({ type: "update_defaultAddress", payload: item });
  };
};
export const { Context, Provider } = createDataContext(
  userReducer,
  { updateUserId,updateDefaultAddress },
  { userId: "", defaultAddress: {} }
);
