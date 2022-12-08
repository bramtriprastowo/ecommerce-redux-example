const initialState = {
  cart: [],
};

const handleCart = (state = initialState.cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      //Check if product is already existed
      const existToAdd = state.find((item) => item.id === product.id);
      if (existToAdd) {
        return state.map((item) => {
          if (item.id === product.id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }
    case "REMOVEITEM":
      const existToRemove = state.find((item) => item.id === product.id);
      if (existToRemove.qty === 1) {
        return state;
      } else {
        return state.map((item) => {
          if (item.id === product.id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    case "DELETEITEM":
      const existToDelete = state.find((item) => item.id === product.id);
      if (existToDelete) {
        return state.filter((item) => item.id !== product.id);
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default handleCart;
