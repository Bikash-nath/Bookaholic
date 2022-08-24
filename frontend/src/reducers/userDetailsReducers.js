export const userDetailsReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case "USER_DETAILS_REQUEST":
         return { ...state, loading: true }

      case "USER_DETAILS_SUCCESS":
         return {
            loading: false,
            success: true,
            user: action.payload,
         }

      case "USER_DETAILS_FAIL":
         return { loading: false, error: action.payload }

      case "USER_DETAILS_RESET":
         return { user: {} }

      default:
         return state
   }
}

export const userFollowAuthorReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case "USER_FOLLOW_AUTHOR_REQUEST":
         return { loading: true }

      case "USER_FOLLOW_AUTHOR_SUCCESS":
         return {
            loading: false,
            success: true,
            userAuthors: action.payload,
         }

      case "USER_FOLLOW_AUTHOR_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const userFavouriteBookReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case "USER_FAVOURITE_BOOK_REQUEST":
         return { loading: true }

      case "USER_FAVOURITE_BOOK_SUCCESS":
         return {
            loading: false,
            success: true,
            userBooks: action.payload,
         }

      case "USER_FAVOURITE_BOOK_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const userFavouriteGenreReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case "USER_FAVOURITE_GENRE_REQUEST":
         return { loading: true }

      case "USER_FAVOURITE_GENRE_SUCCESS":
         return {
            loading: false,
            success: true,
            userGenres: action.payload,
         }

      case "USER_FAVOURITE_GENRE_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const userUpdateNotificationsReducer = (state = { notifications: {} }, action) => {
   switch (action.type) {
      case "USER_UPDATE_NOTIFICATIONS_REQUEST":
         return { loading: true }

      case "USER_UPDATE_NOTIFICATIONS_SUCCESS":
         return {
            loading: false,
            success: true,
            unread: action.payload,
         }

      case "USER_UPDATE_NOTIFICATIONS_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const userNotificationsReducer = (state = { notifications: {} }, action) => {
   switch (action.type) {
      case "USER_GET_NOTIFICATIONS_REQUEST":
         return { loading: true }

      case "USER_GET_NOTIFICATIONS_SUCCESS":
         return {
            loading: false,
            success: true,
            unread: action.payload,
         }

      case "USER_GET_NOTIFICATIONS_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}
