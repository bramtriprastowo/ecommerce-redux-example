// Adding item to cart
const addCart = (product) => {
  return {
    type: 'ADDITEM',
    payload: product,
  };
};

const removeCart = (product) => {
    return {
      type: 'REMOVEITEM',
      payload: product,
    };
};

const deleteCart = (product) => {
    return {
      type: 'DELETEITEM',
      payload: product,
    };
};


export {addCart, removeCart, deleteCart}
