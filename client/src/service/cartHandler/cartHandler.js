export function saveCartToStorage(cart) {
  window.localStorage.setItem("cart", JSON.stringify(cart));
}
export function getCartFromStorage() {
  const cart = window.localStorage.getItem("cart");
  return JSON.parse(cart) || [];
}
