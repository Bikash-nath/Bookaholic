import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Container, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import { getBestSellerBooks, getIndianBooks, searchBooks } from "../actions/bookActions"
import { getTopAuthors } from "../actions/authorActions"
import Carousels from "../components/Carousel"
import BooksRow from "../components/BooksRow"
import AuthorsRow from "../components/AuthorsRow"
import Paginate from "../components/Paginate"
import Loader from "../components/Loader"
import Message from "../components/Message"

function HomeScreen({ history }) {
	const dispatch = useDispatch()

	const bookBestSeller = useSelector((state) => state.bookBestSeller)
	const { bestSellerBooks, loading, error } = bookBestSeller

	const bookIndian = useSelector((state) => state.bookIndian)
	const { indianBooks, loadingIndianBooks, errorIndianBooks } = bookIndian

	const bookSearchList = useSelector((state) => state.bookSearchList)
	const { searchedBooks, loadingSearch, errorSearch, page, pages, totalBooks } = bookSearchList

	const topAuthors = useSelector((state) => state.topAuthors)
	const { authors, loading: loadingAuthors, error: errorAuthors } = topAuthors

	const keyword = history.location.search

	useEffect(() => {
		if (!keyword) {
			dispatch(getBestSellerBooks())
			dispatch(getIndianBooks())
			dispatch(getTopAuthors())
		} else {
			dispatch(searchBooks(keyword))
		}
	}, [keyword, dispatch])

	const getGenreBooks = (genre) => {
		history.push(`/books/genre/${genre}`)
	}

	const topGenreList = [
		"Action & Adventures",
		"Crime & Thriller",
		"Literature & Fiction",
		"Sci-fi & Fantasy",
		"Children & Young Adult",
		"Biographies & Memoirs",
		"Romance",
		"Indian Writing",
		"Business & Economics",
		"Family & Personal Development",
		"Study Aids & Exam Prep",
		"Politics & Social Sciences",
	]

	return (
		<Container fluid className="mt-5 pt-2">
			{!keyword &&
				(loading || loadingIndianBooks || loadingAuthors || !authors?.length ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : error ? (
					<Message variant="danger">{errorIndianBooks}</Message>
				) : error ? (
					<Message variant="danger">{errorAuthors}</Message>
				) : (
					<>
						<Container fluid>
							<Carousels />

							<h3 className="mb-0">Best sellers</h3>
							<BooksRow books={bestSellerBooks} />
							<h3 className="mb-0">India reading</h3>
							<BooksRow books={indianBooks} />
							<Row className="my-2">
								<h3 className="mb-0">Shop by Genre</h3>
								{topGenreList.map((genre, i) => (
									<Col key={i} xs={3} sm={3} md={2} lg={1} xl={1}>
										<Link onClick={() => getGenreBooks(genre)}>
											<Image
												src={"static/icons/" + genre.split(" ")[0] + ".png"}
												alt={genre}
												roundedCircle
												fluid
											/>
										</Link>
										<Link onClick={() => getGenreBooks(genre)} className="link">
											<Row className="center" style={{ fontSize: "0.9rem", padding: "0 0.5rem" }}>
												{genre}
											</Row>
										</Link>
									</Col>
								))}
							</Row>
							<Row>
								<h3 className="mb-0">Featured Authors</h3>
								<AuthorsRow authors={authors.slice(0, 8)} slides={8} />
							</Row>
						</Container>
					</>
				))}
			{keyword &&
				(loadingSearch || searchedBooks?.length < 0 ? (
					<Loader />
				) : errorSearch ? (
					<Message variant="danger">{errorSearch}</Message>
				) : (
					<Container fluid>
						<Row className="mb-3">
							<Col xs={12} md={8}>
								<h3>{`${totalBooks} results for '${keyword.split("?keyword=")[1].split("&")[0]}'`}</h3>
							</Col>
						</Row>
						{[...Array(4).keys()].map((i) => (
							<BooksRow books={searchedBooks?.slice(6 * i, 6 * (i + 1))} />
						))}
						<Paginate page={page} pages={pages} keyword={keyword} />
					</Container>
				))}
		</Container>
	)
}

export default HomeScreen
