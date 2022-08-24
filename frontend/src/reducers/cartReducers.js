export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case "CART_ADD_ITEM":
			const item = action.payload;
			let index = -1;

			state.cartItems.forEach((x, i) => {
				if (x.bookId === item.bookId) index = i;
			});

			if (index !== -1) {
				state.cartItems[index] = item;
				return {
					...state,
					cartItems: state.cartItems,
				};
			} else
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};

		case "CART_REMOVE_ITEM":
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.bookId !== action.payload),
			};

		case "CART_SAVE_SHIPPING_ADDRESS":
			return {
				...state,
				shippingAddress: action.payload,
			};

		case "CART_SAVE_PAYMENT_METHOD":
			return {
				...state,
				paymentMethod: action.payload,
			};

		case "CART_CLEAR_ITEMS":
			return {
				...state,
				cartItems: [],
			};

		default:
			return state;
	}
};
