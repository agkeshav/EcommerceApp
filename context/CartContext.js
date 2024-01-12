import createDataContext from "./createDataContext";
const cartReducer = (state, action) => {
  switch (action.type) {
    case "add_item": {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent) {
        const updatedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "remove_item": {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent) {
        const updatedCart = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        return { ...state, cart: updatedCart };
      }

      return state;
    }

    case "increment_quantity": {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cart: updatedCart };
    }
    case "decrement_quantity": {
      const updatedCart = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              // If quantity is 1 or less, remove the item
              return null;
            }
          } else {
            return item;
          }
        })
        .filter(Boolean); // Filter out null values

      return { ...state, cart: updatedCart };
    }
    case "clear_cart": {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};
const addItem = (dispatch) => {
  return (item) => {
    dispatch({ type: "add_item", payload: item });
  };
};
const removeItem = (dispatch) => {
  return (item) => {
    dispatch({ type: "remove_item", payload: item });
  };
};
const incrementQuantity = (dispatch) => {
  return (item) => {
    dispatch({ type: "increment_quantity", payload: item });
  };
};
const decrementQuantity = (dispatch) => {
  return (item) => {
    dispatch({ type: "decrement_quantity", payload: item });
  };
};
const clearCart = (dispatch) => {
  return () => {
    dispatch({ type: "clear_cart" });
  };
};
export const { Context, Provider } = createDataContext(
  cartReducer,
  { addItem, incrementQuantity, decrementQuantity, removeItem, clearCart },
  { cart: [] }
);
