import axios from "axios";

export const addToWishList = (id) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/books/${id}`);

	dispatch({
		type: "WISHLIST_ADD_ITEM",
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
			countInStock: data.count_in_stock,
		},
	});

	localStorage.setItem(
		"wishListItems",
		JSON.stringify(getState().wishList.wishListItems)
	);
};

export const removeFromWishList = (id) => (dispatch, getState) => {
	dispatch({
		type: "WISHLIST_REMOVE_ITEM",
		payload: id,
	});

	localStorage.setItem(
		"wishListItems",
		JSON.stringify(getState().wishList.wishListItems)
	);
};
