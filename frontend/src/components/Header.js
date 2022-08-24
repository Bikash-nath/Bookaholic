import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Row, Col, Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import { logout } from "../actions/userProfileActions"
import { updateReadNotifications } from "../actions/userDetailsActions"
import Notification from "./Notification"
import SearchBox from "./SearchBox"

function Header() {
	const [showModal, setShowModal] = useState(false)
	const [unreadNotifications, setUnreadNotifications] = useState(0)

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userNotifications = useSelector((state) => state.userNotifications)
	const { unread } = userNotifications

	const history = useHistory()

	const cart = useSelector((state) => state.cart)
	const wishList = useSelector((state) => state.wishList)

	const dispatch = useDispatch()

	const logoutHandler = () => {
		dispatch(logout())
		history.push("/")
	}

	useEffect(() => {
		if (unread !== unreadNotifications) setUnreadNotifications(unread)
	}, [unread])

	const handleClose = () => {
		setShowModal(false)
		dispatch(updateReadNotifications())
		setUnreadNotifications(0)
	}

	return (
		<header>
			<Navbar className="fixed-top py-0" bg="primary" variant="dark" expand="lg" collapseonselect>
				<Container fluid className="mx-2 my-0">
					<LinkContainer to="/">
						<Navbar.Brand className="p-0 m-0">
							<span className="title p-0 m-0">
								<Row style={{ width: "6em" }}>
									<Col xs={2} className="p-0 m-0">
										<Image src="static/icons/bookaholic.png" fluid roundedCircle />
									</Col>
									<Col style={{ fontSize: "1.6rem" }} className="my-2 py-1">
										Bookaholic
									</Col>
								</Row>
							</span>
						</Navbar.Brand>
					</LinkContainer>
					<Col xs={6} sm={8} md={9} lg={4} xl={4} className="mx-1">
						<SearchBox />
					</Col>

					<Navbar.Toggle />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto" id="userNav">
							{userInfo ? (
								<NavDropdown
									title={
										<>
											<i className="fas fa-user-circle" /> <strong>{userInfo.first_name}</strong>
										</>
									}
									id="name"
									className="mx-1"
								>
									<LinkContainer to="/profile">
										<NavDropdown.Item>
											<strong>
												<i className="fas fa-id-badge" /> Profile
											</strong>
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/orders">
										<NavDropdown.Item>
											<strong>
												<i className="fas fa-list-ul" /> My Orders
											</strong>
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										<i className="fas fa-sign-out-alt" /> Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user" />
										<strong> Login</strong>
									</Nav.Link>
								</LinkContainer>
							)}
							<LinkContainer to="/library" className="mx-2">
								<Nav.Link>
									<i className="fas fa-book-reader" /> <strong>Library</strong>
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart fa-lg" /> <strong>Cart</strong>{" "}
									{cart.cartItems.length > 0 && `(${cart?.cartItems.length})`}
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/wishlist" className="mx-2">
								<Nav.Link>
									<i variant="danger" className="fas fa-heart fa-lg" /> <strong>Wishlist</strong>{" "}
									{wishList.wishListItems.length > 0 && `(${wishList?.wishListItems.length})`}
								</Nav.Link>
							</LinkContainer>
							<div onClick={() => setShowModal(true)}>
								<Nav.Link className="">
									<i className="fas fa-bell fa-lg" /> {unread > 0 && `(${unreadNotifications})`}
								</Nav.Link>
							</div>
							{userInfo && userInfo.is_admin && (
								<NavDropdown
									title={
										<>
											<i className="fas fa-user-cog" /> Admin
										</>
									}
									id="adminmenu"
								>
									<LinkContainer to="/admin/userlist" className="mx-1">
										<NavDropdown.Item>
											<i className="fas fa-users" /> Users
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{showModal && <Notification showModal={showModal} setShowModal={setShowModal} handleClose={handleClose} />}
		</header>
	)
}

export default Header
