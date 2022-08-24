import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Container, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import { getGenreBooks } from "../actions/bookActions"
import { getUserDetails, favouriteGenre } from "../actions/userDetailsActions"
import BooksRow from "../components/BooksRow"
import Loader from "../components/Loader"
import Message from "../components/Message"

function GenreBooksScreen({ match, history }) {
   const [favourited, setFavourited] = useState(false)
   const [selectedGenre, setSelectedGenre] = useState(match.params.genre)

   const bookGenreList = useSelector((state) => state.bookGenre)
   const { books, loading, error } = bookGenreList

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userDetails = useSelector((state) => state.userDetails)
   const { user, success: userDetailsSuccess } = userDetails

   const userFavouriteGenre = useSelector((state) => state.userFavouriteGenre)
   const { userGenres, success: userGenresSuccess } = userFavouriteGenre

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getGenreBooks(selectedGenre))
      dispatch(getUserDetails("profile"))
   }, [selectedGenre, dispatch])

   useEffect(() => {
      if (userGenres?.length !== user?.genres?.length && userGenresSuccess) {
         dispatch(getUserDetails("profile"))
         // userDetailsSuccess = false //Remove this
      } else if (userDetailsSuccess) {
         const genres = user?.genres?.map((x) => x.genre)
         setFavourited(genres?.includes(selectedGenre))
      }
   }, [user, userGenres, selectedGenre, userDetailsSuccess, userGenresSuccess, dispatch, match])

   const favouriteGenreHandler = () => {
      dispatch(favouriteGenre(selectedGenre))
   }

   const genreList = [
      "Action & Adventures",
      "Art & Crafts",
      "Biographies & Memoirs",
      "Business & Economics",
      "Children & Young Adult",
      "Comics & Mangas",
      "Computers & Internet",
      "Crime & Mystery",
      "Fantasy",
      "Fiction & Literature",
      "Film & Photography",
      "Health & Personal Development",
      "History",
      "Home & Lifestyle",
      "Horror & Thriller",
      "Humor",
      "Language & Writing",
      "Law & Politics",
      "Religion",
      "Romance",
      "Society & Social Sciences",
      "Sports",
      "Study Aids & Exam Prep",
      "Technology & Medicine",
      "Travel",
   ]

   const filterGenreList = () => {
      return genreList.filter((genre) => genre !== selectedGenre)
   }

   return (
      <Container fluid className="mt-5 pt-2">
         {loading || !books ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message>
         ) : (
            <Container fluid>
               <Link to="/" className="link">
                  <Button className="btn btn-light mt-2 mb-1">Go Back</Button>
               </Link>
               <Row className="mb-3">
                  <Col className="m-2">
                     <h3 style={{ display: "inline" }}>'{selectedGenre}' books</h3>
                     {favourited ? (
                        <Button onClick={favouriteGenreHandler} className="py-1 mx-2 my-0  btn-success">
                           <i className="fas fa-check" /> <strong>Favourited</strong>
                        </Button>
                     ) : (
                        books.length !== 0 && (
                           <Button
                              disabled={!userInfo}
                              onClick={favouriteGenreHandler}
                              className="py-1 mx-2 my-0 btn-info"
                           >
                              <i className="fas fa-plus-circle" /> <strong>Add to Favourite</strong>
                           </Button>
                        )
                     )}
                  </Col>
                  <Col className="right">
                     <Form.Group className="p-1">
                        <Form.Label className="mx-2">
                           <h6>Other genres: </h6>
                        </Form.Label>
                        <Form.Control
                           as="select"
                           value={selectedGenre}
                           onChange={(e) => {
                              setSelectedGenre(e.target.value)
                           }}
                           id="categorySelect"
                           custom
                           className="mx-2 py-1"
                        >
                           {filterGenreList().map((genre, i) => (
                              <option key={i} value={genre}>
                                 {genre}
                              </option>
                           ))}
                        </Form.Control>
                     </Form.Group>
                  </Col>
               </Row>
               {books.length === 0 ? (
                  <Message variant="info">No associated books found with this genre</Message>
               ) : (
                  <>
                     {[...Array(4).keys()].map((i) => (
                        <BooksRow books={books.slice(6 * i, 6 * (i + 1))} />
                     ))}
                  </>
               )}
            </Container>
         )}
      </Container>
   )
}

export default GenreBooksScreen
