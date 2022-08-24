import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Row, Col, Button, Form } from "react-bootstrap"

function SearchBox() {
    const [keyword, setKeyword] = useState("")

    const history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} className="mx-1">
            <Form.Group>
                <Row>
                    <Col xs={10}>
                        <Form.Control
                            type="text"
                            name="q"
                            onChange={(e) => setKeyword(e.target.value)}
                            className="ml-sm-5"
                            placeholder="Search books"
                        />
                    </Col>
                    <Col className="px-0 mx-0">
                        <Button type="submit" variant="warning" className="p-1" id="SearchButton">
                            <svg width="24px" height="22px">
                                <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 " />
                            </svg>
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default SearchBox
