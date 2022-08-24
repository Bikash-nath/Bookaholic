import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Button, Image, Card, ListGroup, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

import { getUserDetails, followAuthor, favouriteBook, favouriteGenre } from "../actions/userDetailsActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

function LibraryScreen({ history }) {
   const dispatch = useDispatch()

   const [fetchUser, setFetchUser] = useState(true)
   const [editAuthors, setEditAuthors] = useState(false)
   const [editBooks, setEditBooks] = useState(false)
   const [editGenres, setEditGenres] = useState(false)

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userDetails = useSelector((state) => state.userDetails)
   const { user, loading, detail_error } = userDetails

   useEffect(() => {
      if (!userInfo) {
         history.push("/login")
      }
      //user is logged in.
      else if (!user?.id || fetchUser) {
         dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
         dispatch(getUserDetails("profile"))
         setFetchUser(false)
      }
   }, [fetchUser, user, userInfo, history, dispatch])

   const unfollowAuthorHandler = (authorId) => {
      dispatch(followAuthor(authorId))
      setFetchUser(true)
   }

   const removeBookHandler = (bookId) => {
      dispatch(favouriteBook(bookId))
      setFetchUser(true)
   }

   const removeGenreHandler = (genre) => {
      dispatch(favouriteGenre(genre))
      setFetchUser(true)
   }

   const getGenreBooks = (genre) => {
      history.push(`/books/genre/${genre}`)
   }

   return (
      <Container xs={12} md={9} lg={6} className="mt-5 mx-3" fluid>
         <h2>My Library</h2>
         {loading || !user ? (
            <Loader />
         ) : detail_error ? (
            <Message variant="danger">{detail_error}</Message>
         ) : (
            <div>
               <Row className="pt-4">
                  <Col md={3}>
                     <h4>Authors you follow</h4>
                     <hr />
                  </Col>
                  {!editAuthors && user.authors?.length > 0 && (
                     <Col>
                        <Button onClick={(e) => setEditAuthors(!editAuthors)} className="p-1 px-2">
                           Edit
                        </Button>
                     </Col>
                  )}
               </Row>
               {user.authors?.length === 0 ? (
                  <Col>
                     <Message variant="info">You are not following any authors.</Message>
                  </Col>
               ) : (
                  <ListGroup className="mb-4">
                     <Row>
                        {user.authors?.map((author) => (
                           <Col id={author.id} xs={4} sm={3} lg={2} className="my-1">
                              <Card variant="flush" className="rounded">
                                 <Col className="center">
                                    <Link to={`/author/${author.id}`}>
                                       <Image
                                          src={author.image}
                                          alt={author.name}
                                          className="author-img"
                                          fluid
                                          roundedCircle
                                       />
                                    </Link>
                                 </Col>
                                 <Card.Body className="p-0">
                                    <Link to={`/author/${author.id}`} className="link">
                                       <Row className="center">{author.name}</Row>
                                    </Link>
                                 </Card.Body>
                              </Card>
                              {editAuthors && (
                                 <Row>
                                    <Col className="center">
                                       <Button
                                          onClick={() => unfollowAuthorHandler(author.id)}
                                          variant="warning"
                                          className="p-1 mt-2"
                                       >
                                          Unfollow
                                       </Button>
                                    </Col>
                                 </Row>
                              )}
                           </Col>
                        ))}
                     </Row>
                  </ListGroup>
               )}

               <Row className="pt-4">
                  <Col md={3}>
                     <h4>Your favourite Books</h4>
                     <hr />
                  </Col>
                  {!editBooks && user.books?.length > 0 && (
                     <Col>
                        <Button onClick={(e) => setEditBooks(!editBooks)} className="p-1 px-2">
                           Edit
                        </Button>
                     </Col>
                  )}
               </Row>
               {user.books?.length === 0 ? (
                  <Col>
                     <Message variant="info">You do not have any favourite book.</Message>
                  </Col>
               ) : (
                  <ListGroup className="mb-4">
                     <Row>
                        {user.books?.map((book) => (
                           <Col id={book.id} className="mx-1" xs={4} sm={4} md={3} lg={2} xl={1}>
                              <Link to={`/book/${book.id}`}>
                                 <Image src={book.image} alt={book.title} className="book-img" fluid />
                              </Link>
                              <Link to={`/book/${book.id}`} className="link-title">
                                 <Row className="center" style={{ fontSize: "0.9rem" }}>
                                    {book.title.length > 25 ? book.title.substring(0, 30) + "..." : book.title}
                                 </Row>
                              </Link>
                              {editBooks && (
                                 <Row>
                                    <Col className="center">
                                       <Button
                                          variant="warning"
                                          onClick={() => removeBookHandler(book.id)}
                                          className="p-1 py-0 my-1"
                                       >
                                          Remove
                                       </Button>
                                    </Col>
                                 </Row>
                              )}
                           </Col>
                        ))}
                     </Row>
                  </ListGroup>
               )}

               <Row className="pt-4">
                  <Col md={3}>
                     <h4>Your favourite Genres</h4>
                     <hr />
                  </Col>
                  {!editGenres && user.genres?.length > 0 && (
                     <Col className="mx-2">
                        <Button onClick={(e) => setEditGenres(!editGenres)} className="p-1 px-2">
                           Edit
                        </Button>
                     </Col>
                  )}
               </Row>
               {user.genres?.length === 0 ? (
                  <Col>
                     <Message variant="info">You do not have any favourite genre.</Message>
                  </Col>
               ) : (
                  <ListGroup className="mb-4">
                     <Row>
                        {user.genres?.map((ele) => (
                           <Col xs="auto" className="mx-2 my-2" id={ele.id}>
                              <Button variant="dark" className="m-1" onClick={() => getGenreBooks(ele.genre)}>
                                 {ele.genre}
                              </Button>
                              {editGenres && (
                                 <Row>
                                    <Col className="center">
                                       <Button
                                          variant="warning"
                                          onClick={() => removeGenreHandler(ele.genre)}
                                          className="py-0 p-1 my-1"
                                       >
                                          Remove
                                       </Button>
                                    </Col>
                                 </Row>
                              )}
                           </Col>
                        ))}
                     </Row>
                  </ListGroup>
               )}
            </div>
         )}
      </Container>
   )
}
export default LibraryScreen
