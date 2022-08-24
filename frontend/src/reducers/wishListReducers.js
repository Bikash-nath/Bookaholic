export const wishListReducer = (state = { wishListItems: [] }, action) => {
	switch (action.type) {
		case "WISHLIST_ADD_ITEM":
			const item = action.payload;
			const itemIds = state.wishListItems.map((x) => x.bookId);

			if (itemIds.includes(item.bookId)) {
				return state;
			} else
				return {
					...state,
					wishListItems: [...state.wishListItems, item],
				};

		case "WISHLIST_REMOVE_ITEM":
			return {
				...state,
				wishListItems: state.wishListItems.filter(
					(x) => x.bookId !== action.payload
				),
			};

		case "WISHLIST_CLEAR_ITEMS":
			return {
				...state,
				wishListItems: [],
			};

		default:
			return state;
	}
};
