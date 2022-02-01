const ADD_TO_PRODUCTS = "ADD_TO_PRODUCTS";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_QUANTITY = "ADD_QUANTITY";
const SUB_QUANTITY = "SUB_QUANTITY";
const EMPTY_CART = "EMPTY_CART";

const initialState = {
	products: [],
};
const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case ADD_TO_CART:
			return {
				...state,
				products: state.products.map((product) =>
					product.id === action.id ? { ...product, selected: true } : product
				),
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				products: state.products.map((product) =>
					product.id === action.id
						? { ...product, selected: false, quantity: 1 }
						: product
				),
			};
		case ADD_QUANTITY:
			return {
				...state,
				products: state.products.map((product) =>
					product.id === action.id
						? { ...product, quantity: product.quantity + 1 }
						: product
				),
			};
		case SUB_QUANTITY:
			return {
				...state,
				products: state.products.map((product) =>
					product.id === action.id
						? {
								...product,
								quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
						  }
						: product
				),
			};
		case EMPTY_CART:
			return {
				...state,
				products: [],
			};
		default:
			return state;
	}
};
export default cartReducer;
