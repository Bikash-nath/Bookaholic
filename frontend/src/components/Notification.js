import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Row, Col, ListGroup, Button, Modal } from "react-bootstrap"

import { getUserDetails } from "../actions/userDetailsActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

function Notification({ showModal, setShowModal, handleClose }) {
   const userDetails = useSelector((state) => state.userDetails)
   const { user, loading, error } = userDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const dispatch = useDispatch()
   const history = useHistory()

   useEffect(() => {
      if (!userInfo) {
         history.push("/login")
      }
      //user is logged in.
      else {
         dispatch(getUserDetails())
      }
   }, [userInfo, history, dispatch])

   return (
      <Modal show={showModal} onHide={handleClose} dialogClassName="modal-position-right">
         {loading || !user?.notifications ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message>
         ) : user.notifications?.length === 0 ? (
            <Message variant="info" margin="my-0">
               Your notification list is empty.
            </Message>
         ) : (
            <div>
               <Modal.Header closeButton>
                  <Modal.Title>Notifications</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <ListGroup>
                     {user.notifications.map((notification) => (
                        <ListGroup.Item key={notification.id} className="py-1">
                           <Row>
                              <Col md={notification.is_unread ? 10 : 12}>
                                 <Row>
                                    <strong>{notification.title}</strong>
                                 </Row>
                                 <Row>
                                    <Col>
                                       <Row>{notification.body}</Row>
                                    </Col>
                                 </Row>
                              </Col>
                              {notification.is_unread && (
                                 <Col md={2} className="p-0 m-0 right">
                                    <Button variant="info" disabled className="btn-sm p-0 px-1">
                                       <strong>unread</strong>
                                    </Button>
                                 </Col>
                              )}
                           </Row>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" className="my-0" onClick={() => setShowModal(false)}>
                     Close
                  </Button>
               </Modal.Footer>
            </div>
         )}
      </Modal>
   )
}
export default Notification
