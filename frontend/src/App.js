import React from "react";
import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomeScreen from "./screens/HomeScreen";
import BookScreen from "./screens/BookScreen";
import GenreBooksScreen from "./screens/GenreBooksScreen";
import AuthorScreen from "./screens/AuthorScreen";
import AuthorBooksScreen from "./screens/AuthorBooksScreen";
import CartScreen from "./screens/CartScreen";
import WishListScreen from "./screens/WishListScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LibraryScreen from "./screens/LibraryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import UserListScreen from "./screens/UserListScreen";

function App() {
	const paths = [
		"/",
		"/profile",
		"/library",
		"/book/:id",
		"/books/genre/:genre",
		"/books/author/:id",
		"/author/:id",
		"/cart/:id?",
		"/wishlist/:id?",
		"/order/:id",
		"/orders",
		"/profile",
		"/library",
		"/admin/userlist",
	];
	return (
		<Router>
			<ScrollToTop />
			<Route path={paths} exact component={Header} />
			<main className="py-3">
				<Container fluid>
					<Route path="/" component={HomeScreen} exact />
					<Route path="/book/:id" component={BookScreen} exact />
					<Route
						path="/books/genre/:genre"
						component={GenreBooksScreen}
						exact
					/>
					<Route path="/books/author/:id" component={AuthorBooksScreen} exact />
					<Route path="/author/:id" component={AuthorScreen} exact />

					<Route path="/cart/:id?" component={CartScreen} exact />
					<Route path="/wishlist/:id?" component={WishListScreen} exact />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/order/:id" component={OrderScreen} />
					<Route path="/orders" component={OrderListScreen} />

					<Route path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/library" component={LibraryScreen} />
					<Route path="/admin/userlist" component={UserListScreen} />
				</Container>
			</main>
			<Route path={paths} exact component={Footer} />
		</Router>
	);
}

export default App;
