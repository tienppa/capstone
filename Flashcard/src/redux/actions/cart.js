const ADD_TO_PRODUCTS = "ADD_TO_PRODUCTS";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_QUANTITY = "ADD_QUANTITY";
const SUB_QUANTITY = "SUB_QUANTITY";
const EMPTY_CART = "EMPTY_CART";

export const addToProducts = (payload) => {
	return {
		type: ADD_TO_PRODUCTS,
		payload: payload,
	};
};
export const addToCart = (id) => {
	return {
		type: ADD_TO_CART,
		id,
	};
};
export const removeFromCart = (id) => {
	return {
		type: REMOVE_FROM_CART,
		id,
	};
};
export const subtractQuantity = (id) => {
	return {
		type: SUB_QUANTITY,
		id,
	};
};
export const addQuantity = (id) => {
	return {
		type: ADD_QUANTITY,
		id,
	};
};
export const emptyCart = () => {
	return {
		type: EMPTY_CART,
	};
};
