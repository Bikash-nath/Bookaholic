export const orderCreateReducer = (state = {}, action) => {
   switch (action.type) {
      case "ORDER_CREATE_REQUEST":
         return { loading: true }

      case "ORDER_CREATE_SUCCESS":
         return {
            loading: false,
            success: true,
            order: action.payload,
         }

      case "ORDER_CREATE_FAIL":
         return { loading: false, error: action.payload }

      case "ORDER_CREATE_RESET":
         return {}

      default:
         return state
   }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: [] }, action) => {
   switch (action.type) {
      case "ORDER_DETAILS_REQUEST":
         return {
            ...state,
            loading: true,
         }

      case "ORDER_DETAILS_SUCCESS":
         return {
            loading: false,
            order: action.payload,
         }

      case "ORDER_DETAILS_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const orderPayReducer = (state = {}, action) => {
   switch (action.type) {
      case "ORDER_PAY_REQUEST":
         return {
            loading: true,
         }

      case "ORDER_PAY_SUCCESS":
         return {
            loading: false,
            success: true,
         }

      case "ORDER_PAY_FAIL":
         return { loading: false, error: action.payload }

      case "ORDER_PAY_RESET":
         return {}

      default:
         return state
   }
}

export const orderListReducer = (state = {}, action) => {
   switch (action.type) {
      case "ORDER_LIST_REQUEST":
         return {
            loading: true,
         }

      case "ORDER_LIST_SUCCESS":
         return {
            loading: false,
            orders: action.payload,
         }

      case "ORDER_LIST_FAIL":
         return { loading: false, error: action.payload }

      case "ORDER_LIST_RESET":
         return { orders: [] }

      default:
         return state
   }
}

export const orderCancelReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case "ORDER_CANCEL_REQUEST":
         return { loading: true }

      case "ORDER_CANCEL_SUCCESS":
         return {
            loading: false,
            success: true,
            message: action.payload,
         }

      case "ORDER_CANCEL_FAIL":
         return { loading: false, error: action.payload }

      case "ORDER_CANCEL_RESET":
         return { orders: [] }

      default:
         return state
   }
}

export const orderItemCancelReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case "ORDER_ITEM_CANCEL_REQUEST":
         return { loading: true }

      case "ORDER_ITEM_CANCEL_SUCCESS":
         return {
            loading: false,
            success: true,
            message: action.payload,
         }

      case "ORDER_ITEM_CANCEL_FAIL":
         return { loading: false, error: action.payload }

      case "ORDER_ITEM_CANCEL_RESET":
         return { orders: [] }

      default:
         return state
   }
}
