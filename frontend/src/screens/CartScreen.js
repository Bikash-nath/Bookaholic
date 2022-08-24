import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Form, Button, Card, Container, OverlayTrigger, Tooltip } from "react-bootstrap"

import { addToCart, removeFromCart } from "../actions/cartActions"
import { addToWishList } from "../actions/wishListActions"

import Message from "../components/Message"

function CartScreen({ match, location, history }) {
   const bookId = match.params.id
   const qty = location.search ? Number(location.search.split("=")[1]) : ""
   const dispatch = useDispatch()

   const cart = useSelector((state) => state.cart)

   useEffect(() => {
      if (bookId) {
         dispatch(addToCart(bookId, qty))
      }
   }, [dispatch, bookId, qty])

   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
   }

   const deleteAllCartHandler = () => {
      dispatch({ type: "CART_CLEAR_ITEMS" })
      localStorage.removeItem("cartItems")
   }

   const moveToWishListHandler = (id) => {
      dispatch(removeFromCart(id))
      dispatch(addToWishList(id))
   }

   const moveAllToWishListHandler = () => {
      cart.cartItems.forEach((item) => {
         dispatch(addToWishList(item.bookId))
      })
      dispatch({ type: "CART_CLEAR_ITEMS" })
      localStorage.removeItem("cartItems")
   }

   const checkOutHandler = () => {
      history.push("/login?redirect=shipping")
   }

   cart.itemsPrice = Math.round(cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))
   cart.savings =
      Math.round(cart.cartItems.reduce((acc, item) => acc + item.qty * item.orignalPrice, 0)) - cart.itemsPrice
   cart.shippingPrice = Math.round(cart.itemsPrice >= 500 || cart.cartItems.length === 0 ? 0 : 50)
   cart.totalPrice = Math.round(Number(cart.itemsPrice) + Number(cart.shippingPrice))

   const deleteTooltip = (props) => (
      <Tooltip id="delete-tooltip" {...props}>
         Delete this item from cart
      </Tooltip>
   )

   const wishListTooltip = (props) => (
      <Tooltip id="wishList-tooltip" {...props}>
         Move this item to wish list
      </Tooltip>
   )

   return (
      <Container fluid className="pt-5">
         <Row className="my-2">
            <Col xs={12} md={8}>
               <h2>Shopping Cart</h2>
               {cart.cartItems.length === 0 ? (
                  <Message variant="info">
                     Your Cart is empty{"\t\n"}
                     <Link to="/" className="btn btn-light my-1 link">
                        Go Back
                     </Link>
                  </Message>
               ) : (
                  <ListGroup variant="flush">
                     <ListGroup.Item>
                        <Row>
                           <Col>
                              <Button
                                 className="btn-block"
                                 variant="info"
                                 disabled={cart.cartItems.length === 0}
                                 onClick={moveAllToWishListHandler}
                              >
                                 Move All items to Wishlist
                              </Button>
                              <Button
                                 className="btn-block float-right"
                                 variant="danger"
                                 disabled={cart.cartItems.length === 0}
                                 onClick={deleteAllCartHandler}
                              >
                                 Delete all items
                              </Button>
                           </Col>
                        </Row>
                     </ListGroup.Item>

                     {cart.cartItems.map((item) => (
                        <ListGroup.Item key={item.bookId} className="py-2">
                           <Row>
                              <Col xs={4} lg={3}>
                                 <Col xl={10}>
                                    <Link to={`/book/${item.bookId}`}>
                                       <Image
                                          src={item.image}
                                          alt={item.title}
                                          style={{ maxHeight: "12rem" }}
                                          fluid
                                          rounded
                                       />
                                    </Link>
                                 </Col>
                              </Col>
                              <Col xs={8} lg="auto">
                                 <Row className="my-1">
                                    <Link to={`/book/${item.bookId}`} className="link">
                                       <h5>{item.title}</h5>
                                    </Link>
                                 </Row>
                                 <Row className="mb-1">
                                    <Col>
                                       by{" "}
                                       <Link to={`/author/${item.authorId}`} className="link">
                                          {item.authorName}
                                       </Link>
                                    </Col>
                                 </Row>
                                 <Row className="mb-1">
                                    <Col>{item.format}</Col>
                                 </Row>
                                 <Row>
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
                                             <strong style={{ fontSize: "1rem" }}>
                                                Only {item.countInStock} left in stock
                                             </strong>
                                          </Row>
                                       )}
                                    </Col>
                                 </Row>

                                 <Row className="mb-1">
                                    <Col className="red" xs="auto" style={{ fontSize: "1.3rem" }}>
                                       ₹{item.price}
                                    </Col>
                                    <Col className="grey" xs="auto">
                                       <strike>₹{item.orignalPrice}</strike>
                                    </Col>
                                    <Col className="green" xs="auto">
                                       {item.discount}% off
                                    </Col>
                                 </Row>
                                 <ListGroup horizontal className="mt-1 p-0 border-0">
                                    <ListGroup.Item className="mx-0 p-0 border-0">
                                       Qty:{" "}
                                       <Form.Control
                                          as="select"
                                          value={item.qty}
                                          className="m-1 select-menu"
                                          custom
                                          onChange={(e) => {
                                             dispatch(addToCart(item.bookId, Number(e.target.value)))
                                          }}
                                       >
                                          {[...Array(item.countInStock > 5 ? 5 : item.countInStock).keys()].map(
                                             (x) => (
                                                <option key={x + 1} value={x + 1}>
                                                   {x + 1}
                                                </option>
                                             )
                                          )}
                                       </Form.Control>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="py-0 border-0">
                                       <OverlayTrigger placement="bottom" overlay={wishListTooltip}>
                                          <Button
                                             variant="warning"
                                             className="px-3 py-1"
                                             onClick={() => moveToWishListHandler(item.bookId)}
                                          >
                                             <i variant="danger" className="fas fa-heart fa-lg" />
                                          </Button>
                                       </OverlayTrigger>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="py-0 border-0">
                                       <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
                                          <Button
                                             variant="danger"
                                             className="px-3 py-1"
                                             onClick={() => removeFromCartHandler(item.bookId)}
                                          >
                                             <i className="fas fa-trash fa-lg" />
                                          </Button>
                                       </OverlayTrigger>
                                    </ListGroup.Item>
                                 </ListGroup>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               )}
            </Col>
            <Col md={4} className="mt-2">
               <Card>
                  <ListGroup variant="flush">
                     <ListGroup.Item className="py-0">
                        <h3>Cart Summary</h3>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</Col>
                           <Col className="right">₹{cart.itemsPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Savings:</Col>
                           <Col className="green right">
                              {cart.cartItems.length > 0 ? `- ₹${cart.savings}` : "--"}
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Shipping:</Col>
                           <Col className="right">₹{cart.shippingPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row className="mt-1 mb-1 red" style={{ fontSize: "1.3rem" }}>
                           <Col>Total:</Col>
                           <Col className="right">₹{cart.totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                        <Button
                           className="btn-block"
                           disabled={cart.cartItems.length === 0}
                           onClick={checkOutHandler}
                        >
                           Proceed To CheckOut
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
               <Card className="mt-3">
                  <ListGroup>
                     {cart.itemsPrice >= 500 ? (
                        <ListGroup.Item variant="success">Your order is eligible for Free delivery</ListGroup.Item>
                     ) : (
                        <ListGroup.Item variant="info">
                           Add items worth ₹{500 - cart.itemsPrice} for Free delivery
                        </ListGroup.Item>
                     )}
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </Container>
   )
}
export default CartScreen
