export const bookBestSellerReducer = (state = { bestSellerBooks: [] }, action) => {
   switch (action.type) {
      case "BOOK_BESTSELLER_LIST_REQUEST":
         return { loading: true, ...state, bestSellerBooks: [] }

      case "BOOK_BESTSELLER_LIST_SUCCESS":
         return {
            loading: false,
            bestSellerBooks: action.payload,
         }

      case "BOOK_BESTSELLER_LIST_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const bookIndianReducer = (state = { indianBooks: [] }, action) => {
   switch (action.type) {
      case "BOOK_INDIAN_LIST_REQUEST":
         return { loading: true, ...state, indianBooks: [] }

      case "BOOK_INDIAN_LIST_SUCCESS":
         return {
            loading: false,
            indianBooks: action.payload,
         }

      case "BOOK_INDIAN_LIST_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const bookGenreReducer = (state = { books: [] }, action) => {
   switch (action.type) {
      case "BOOK_GENRE_LIST_REQUEST":
         return { loading: true, books: [] }

      case "BOOK_GENRE_LIST_SUCCESS":
         return {
            loading: false,
            books: action.payload,
         }

      case "BOOK_GENRE_LIST_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const bookSearchListReducer = (state = { searchedBooks: [] }, action) => {
   switch (action.type) {
      case "BOOK_SEARCH_REQUEST":
         return { loading: true, books: [] }

      case "BOOK_SEARCH_SUCCESS":
         return {
            loading: false,
            searchedBooks: action.payload.books,
            page: action.payload.page,
            pages: action.payload.pages,
            totalBooks: action.payload.total_books,
         }

      case "BOOK_SEARCH_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const bookDetailsReducer = (state = { book: { reviews: [] } }, action) => {
   switch (action.type) {
      case "BOOK_DETAILS_REQUEST":
         return { loading: true, ...state }

      case "BOOK_DETAILS_SUCCESS":
         return {
            loading: false,
            book: action.payload,
         }

      case "BOOK_DETAILS_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const similarBookListReducer = (state = { similarBooks: [] }, action) => {
   switch (action.type) {
      case "SIMILAR_BOOK_LIST_REQUEST":
         return { loading: true, similarBooks: [] }

      case "SIMILAR_BOOK_LIST_SUCCESS":
         return {
            loading: false,
            similarBooks: action.payload,
         }

      case "SIMILAR_BOOK_LIST_FAIL":
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const bookCreateReviewReducer = (state = {}, action) => {
   switch (action.type) {
      case "BOOK_CREATE_REVIEW_REQUEST":
         return { loading: true, ...state }

      case "BOOK_CREATE_REVIEW_SUCCESS":
         return {
            loading: false,
            success: true,
         }

      case "BOOK_CREATE_REVIEW_FAIL":
         return { loading: false, error: action.payload }

      case "BOOK_CREATE_REVIEW_RESET":
         return {}

      default:
         return state
   }
}

// export const bookListReducer = (state = { bookList: [] }, action) => {
//    switch (action.type) {
//       case "BOOK_LIST_REQUEST":
//          return { loading: true, bookList: [] }

//       case "BOOK_LIST_SUCCESS":
//          return {
//             loading: false,
//             books: action.payload,
//          }

//       case "BOOK_LIST_FAIL":
//          return { loading: false, error: action.payload }

//       default:
//          return state
//    }
// }
