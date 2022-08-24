import axios from "axios"

export const getUserDetails = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_DETAILS_REQUEST",
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/users/details/`, config)
      dispatch({
         type: "USER_DETAILS_SUCCESS",
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: "USER_DETAILS_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

export const followAuthor = (authorId) => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_FOLLOW_AUTHOR_REQUEST",
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/users/follow/author/`, { authorId }, config)

      dispatch({
         type: "USER_FOLLOW_AUTHOR_SUCCESS", //to update user profile
         payload: data.authors,
      })
   } catch (error) {
      dispatch({
         type: "USER_FOLLOW_AUTHOR_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

export const favouriteBook = (bookId) => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_FAVOURITE_BOOK_REQUEST",
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/users/favourite/book/`, { bookId }, config)

      dispatch({
         type: "USER_FAVOURITE_BOOK_SUCCESS", //to update user profile
         payload: data.books,
      })
   } catch (error) {
      dispatch({
         type: "USER_FAVOURITE_BOOK_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

export const favouriteGenre = (genre) => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_FAVOURITE_GENRE_REQUEST",
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/users/favourite/genre/`, { genre }, config)

      dispatch({
         type: "USER_FAVOURITE_GENRE_SUCCESS", //to update user profile
         payload: data.genres,
      })
   } catch (error) {
      dispatch({
         type: "USER_FAVOURITE_GENRE_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

export const updateReadNotifications = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_UPDATE_NOTIFICATIONS_REQUEST",
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/users/notifications/update/`, {}, config)

      dispatch({
         type: "USER_UPDATE_NOTIFICATIONS_SUCCESS",
         payload: data.unread,
      })
   } catch (error) {
      dispatch({
         type: "USER_UPDATE_NOTIFICATIONS_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

export const getUnreadNotifications = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_GET_NOTIFICATIONS_REQUEST",
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/users/notifications/`, config)

      dispatch({
         type: "USER_GET_NOTIFICATIONS_SUCCESS",
         payload: data.unread,
      })
   } catch (error) {
      dispatch({
         type: "USER_GET_NOTIFICATIONS_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}
