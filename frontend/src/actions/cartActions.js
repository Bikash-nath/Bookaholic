import axios from "axios";

export const addToCart =
	(id, qty = 1) =>
	async (dispatch, getState) => {
		const { data } = await axios.get(`/api/books/${id}`);
		dispatch({
			type: "CART_ADD_ITEM",
			payload: {
				bookId: data.id,
				title: data.title,
				authorId: data.author.id,
				authorName: data.author.name,
				image: data.image,
				format: "Paperback",
				price: Math.round(data.price - data.price * (data.discount / 100)),
				orignalPrice: Number(data.price),
				discount: data.discount,
				seller: data.seller.name,
				countInStock: data.count_in_stock,
				qty,
			},
		});

		localStorage.setItem(
			"cartItems",
			JSON.stringify(getState().cart.cartItems)
		);
	};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: "CART_REMOVE_ITEM",
		payload: id,
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: "CART_SAVE_SHIPPING_ADDRESS",
		payload: data,
	});

	localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: "CART_SAVE_PAYMENT_METHOD",
		payload: data,
	});

	localStorage.setItem("paymentMethod", JSON.stringify(data));
};

//Insted of using localStorage
// export let cartItems = [];
// export let shippingAddress = {};
