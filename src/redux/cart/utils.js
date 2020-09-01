export const addItemToCart = (cartItems, item) => {
  const existingItem = cartItems.find((ele) => ele.id === item.id);

  if (existingItem) {
    return cartItems.map((ele) =>
      ele.id === item.id ? { ...ele, quantity: ele.quantity + 1 } : ele
    );
  }
  return [...cartItems, { ...item, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, id) => {
  const existingItem = cartItems.find((ele) => ele.id === id);
  if (existingItem.quantity === 1) {
    cartItems.filter((ele) => ele.id !== id);
  }
  return cartItems.map((ele) =>
    ele.id === id ? { ...ele, quantity: ele.quantity - 1 } : ele
  );
};
