import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button, Container, Tooltip, OverlayTrigger } from "react-bootstrap"

import { addToWishList, removeFromWishList } from "../actions/wishListActions"
import { addToCart } from "../actions/cartActions"

import Message from "../components/Message"

function WishListScreen({ match, location, history }) {
   const bookId = match.params.id

   const dispatch = useDispatch()

   const wishList = useSelector((state) => state.wishList)

   useEffect(() => {
      if (bookId) {
         dispatch(addToWishList(bookId))
      }
   }, [dispatch, bookId])

   const removeFromWishListHandler = (id) => {
      dispatch(removeFromWishList(id))
   }

   const deleteWishListHandler = () => {
      dispatch({ type: "WISHLIST_CLEAR_ITEMS" })
      localStorage.removeItem("wishListItems")
   }

   const moveToCartHandler = (id) => {
      dispatch(removeFromWishList(id))
      dispatch(addToCart(id))
   }

   const moveAllToCartHandler = () => {
      wishList.wishListItems.forEach((item) => {
         dispatch(addToCart(item.bookId))
      })
      dispatch({ type: "WISHLIST_CLEAR_ITEMS" })
      localStorage.removeItem("wishListItems")
   }

   const wishListTooltip = (props) => (
      <Tooltip id="wishList-tooltip" {...props}>
         Move this item to Cart
      </Tooltip>
   )
   return (
      <Container fluid className="pt-5">
         <Row className="mt-2 center">
            <Col xs={12} lg={9}>
               <Row>
                  <Col xs={10}>
                     <h2>My WishList</h2>
                  </Col>
                  <Col xs={2} className="mt-2">
                     <Link to="/cart" className="link">
                        <Button className="btn btn-light">Go to Cart</Button>
                     </Link>
                  </Col>
               </Row>
               {wishList.wishListItems.length === 0 ? (
                  <Message variant="info">
                     Your WishList is empty{" "}
                     <Link to="/" className="btn btn-light my-1 link">
                        Go Back
                     </Link>
                  </Message>
               ) : (
                  <ListGroup className="py-0 borderless">
                     <ListGroup.Item as={Row}>
                        <Col>
                           <Button
                              className="btn-block"
                              disabled={wishList.wishListItems.length === 0}
                              onClick={moveAllToCartHandler}
                           >
                              Move All to Cart
                           </Button>
                           <Button
                              className="btn-block float-right"
                              variant="danger"
                              disabled={wishList.wishListItems.length === 0}
                              onClick={deleteWishListHandler}
                           >
                              Delete all Items
                           </Button>
                        </Col>
                     </ListGroup.Item>

                     {wishList.wishListItems.map((item) => (
                        <ListGroup.Item as={Row} key={item.bookId} className="py-2">
                           <Row>
                              <Col xs={4} md={2}>
                                 <Link to={`/book/${item.bookId}`}>
                                    <Image
                                       src={item.image}
                                       alt={item.title}
                                       style={{ maxHeight: "10rem" }}
                                       fluid
                                       rounded
                                    />
                                 </Link>
                              </Col>
                              <Col xs={8} md={10} className="py-1 my-0">
                                 <Row className="py-0">
                                    <Col xs={10}>
                                       <Link to={`/book/${item.bookId}`} className="link">
                                          <h5>{item.title}</h5>
                                       </Link>
                                    </Col>
                                    <Col xs={2} className="right py-0">
                                       <OverlayTrigger placement="bottom" overlay={wishListTooltip}>
                                          <Button
                                             variant="danger"
                                             className="my-0 p-2"
                                             onClick={() => removeFromWishListHandler(item.bookId)}
                                          >
                                             <i className="fas fa-trash fa-lg" />
                                          </Button>
                                       </OverlayTrigger>
                                    </Col>
                                 </Row>
                                 <Row className="mb-1">
                                    <Col>
                                       by{" "}
                                       <Link to={`/author/${item.authorId}`} className="link">
                                          {item.authorName}
                                       </Link>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col>{item.format}</Col>
                                 </Row>
                                 <Row className="mb-1">
                                    <Col xs="auto">
                                       {item.countInStock > 50 ? (
                                          <Row className="green">
                                             <strong>In Stock</strong>
                                          </Row>
                                       ) : item.countInStock > 7 ? (
                                          <Row style={{ color: "orange" }}>
                                             <strong>Only a few left</strong>
                                          </Row>
                                       ) : item.countInStock === 0 ? (
                                          <Row className="red">
                                             <strong style={{ fontSize: "1rem" }}>Out of stock</strong>
                                          </Row>
                                       ) : (
                                          <Row className="red">
                                             <strong>Only {item.countInStock} left in stock</strong>
                                          </Row>
                                       )}
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col className="red" xs="auto" style={{ fontSize: "1.3rem" }}>
                                       ₹{item.price}
                                    </Col>
                                    <Col className="grey" xs="auto">
                                       <strike>₹{item.orignalPrice}</strike>
                                    </Col>
                                    <Col className="green" xs="auto">
                                       {item.discount}% off
                                    </Col>
                                    <Col xs={4} className="my-0 py-0 pr-0" style={{ marginLeft: "auto" }}>
                                       <Button
                                          onClick={(e) => moveToCartHandler(item.bookId)}
                                          variant="primary"
                                          className="m-0 float-right"
                                       >
                                          <i className="fas fa-cart-plus fa-lg" />
                                          <strong> Add to Cart</strong>
                                       </Button>
                                    </Col>
                                 </Row>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               )}
            </Col>
         </Row>
      </Container>
   )
}
export default WishListScreen
