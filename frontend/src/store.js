import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import {
   bookBestSellerReducer,
   bookIndianReducer,
   bookGenreReducer,
   bookDetailsReducer,
   similarBookListReducer,
   bookSearchListReducer,
   bookCreateReviewReducer,
} from "./reducers/bookReducers"
import {
   topAuthorsReducer,
   authorDetailsReducer,
   authorSimilarListReducer,
   authorListReducer,
   authorCreateReviewReducer,
} from "./reducers/authorReducers"
import { cartReducer } from "./reducers/cartReducers"
import { wishListReducer } from "./reducers/wishListReducers"
import {
   userLoginReducer,
   userRegisterReducer,
   userProfileReducer,
   userUpdateProfileReducer,
   userListReducer,
   userDeleteReducer,
} from "./reducers/userProfileReducers"
import {
   userDetailsReducer,
   userFollowAuthorReducer,
   userFavouriteBookReducer,
   userFavouriteGenreReducer,
   userUpdateNotificationsReducer,
   userNotificationsReducer,
} from "./reducers/userDetailsReducers"
import {
   orderCreateReducer,
   orderDetailsReducer,
   orderPayReducer,
   orderListReducer,
   orderCancelReducer,
   orderItemCancelReducer,
} from "./reducers/orderReducers"

const reducer = combineReducers({
   bookBestSeller: bookBestSellerReducer,
   bookIndian: bookIndianReducer,
   bookGenre: bookGenreReducer,
   bookDetails: bookDetailsReducer,
   similarBookList: similarBookListReducer,
   bookSearchList: bookSearchListReducer,
   bookCreateReview: bookCreateReviewReducer,

   topAuthors: topAuthorsReducer,
   authorDetails: authorDetailsReducer,
   authorSimilarList: authorSimilarListReducer,
   authorList: authorListReducer,
   authorCreateReview: authorCreateReviewReducer,

   cart: cartReducer,
   wishList: wishListReducer,

   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userProfile: userProfileReducer,
   userUpdateProfile: userUpdateProfileReducer,
   userList: userListReducer,
   userDelete: userDeleteReducer,

   userDetails: userDetailsReducer,
   userFollowAuthor: userFollowAuthorReducer,
   userFavouriteBook: userFavouriteBookReducer,
   userFavouriteGenre: userFavouriteGenreReducer,
   userUpdateNotifications: userUpdateNotificationsReducer,
   userNotifications: userNotificationsReducer,

   orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderPay: orderPayReducer,
   orderList: orderListReducer,
   orderCancel: orderCancelReducer,
   orderItemCancel: orderItemCancelReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const wishListItemsFromStorage = localStorage.getItem("wishListItems")
   ? JSON.parse(localStorage.getItem("wishListItems"))
   : []

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
   ? JSON.parse(localStorage.getItem("shippingAddress"))
   : {}

const initialState = {
   cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
   },
   wishList: {
      wishListItems: wishListItemsFromStorage,
   },
   userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
