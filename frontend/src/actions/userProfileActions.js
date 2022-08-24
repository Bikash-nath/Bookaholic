import axios from "axios"

export const login = (username, password) => async (dispatch) => {
   try {
      dispatch({ type: "USER_LOGIN_REQUEST" })
      const config = {
         headers: {
            "Content-type": "application/json",
         },
      }
      username = username.split("@")[0]
      const { data } = await axios.post("/api/users/login/", { username, password }, config)

      dispatch({
         type: "USER_LOGIN_SUCCESS",
         payload: data,
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
   } catch (error) {
      dispatch({
         type: "USER_LOGIN_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

export const logout = () => (dispatch) => {
   localStorage.removeItem("userInfo")
   dispatch({ type: "USER_LOGOUT" })
   dispatch({ type: "USER_DETAILS_RESET" }) //Reset Logged In user details in store (for form).
   dispatch({ type: "ORDERS_LIST_RESET" })
   dispatch({ type: "CART_CLEAR_ITEMS" })
   dispatch({ type: "WISHLIST_CLEAR_ITEMS" })
   dispatch({ type: "USER_LIST_RESET" })
}

export const register = (firstName, lastName, email, password) => async (dispatch) => {
   try {
      dispatch({ type: "USER_REGISTER_REQUEST" })
      const config = {
         headers: {
            "Content-type": "application/json",
         },
      }

      const { data } = await axios.post("/api/users/register/", { firstName, lastName, email, password }, config)

      dispatch({
         type: "USER_REGISTER_SUCCESS",
         payload: data,
      })

      dispatch({
         type: "USER_LOGIN_SUCCESS",
         payload: data,
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
   } catch (error) {
      dispatch({
         type: "USER_REGISTER_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}
//To get user profile based on :id or 'profile' passed as argument
export const getUserProfile = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_PROFILE_REQUEST",
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

      const { data } = await axios.get(`/api/users/profile/`, config)

      dispatch({
         type: "USER_PROFILE_SUCCESS",
         payload: data,
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
   } catch (error) {
      dispatch({
         type: "USER_PROFILE_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

//To update user profile based on user object
export const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_UPDATE_PROFILE_REQUEST",
      })

      const {
         userLogin: { userInfo },
      } = getState()

      var formData = new FormData()
      for (var key in user) {
         formData.append(key, user[key])
      }

      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/users/profile/update/`, formData, config)

      dispatch({
         type: "USER_UPDATE_PROFILE_SUCCESS",
         payload: data,
      })

      dispatch({
         type: "USER_LOGIN_SUCCESS",
         payload: data,
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
   } catch (error) {
      dispatch({
         type: "USER_UPDATE_PROFILE_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

//To update user profile based on user object
export const getUserList = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_LIST_REQUEST",
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

      const { data } = await axios.get(`/api/users/`, config)

      dispatch({
         type: "USER_LIST_SUCCESS",
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: "USER_LIST_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}

//To update user profile based on user object
export const deleteUser = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: "USER_DELETE_REQUEST",
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

      const { data } = await axios.delete(`/api/users/delete/${id}`, config)

      dispatch({
         type: "USER_DELETE_SUCCESS",
         payload: data.message,
      })
   } catch (error) {
      dispatch({
         type: "USER_DELETE_FAIL",
         payload: error.response?.data.error_message ? error.response.data.error_message : error.message,
      })
   }
}
