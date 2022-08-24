import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Form, Button, Image, InputGroup } from "react-bootstrap"

import { getUserProfile, updateUserProfile } from "../actions/userProfileActions"
import { getUnreadNotifications } from "../actions/userDetailsActions"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import Message from "../components/Message"

function ProfileScreen({ history }) {
   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [mobileNo, setMobileNo] = useState("")
   const [gender, setGender] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [message, setMessage] = useState("")
   const [selectedImage, setSelectedImage] = useState({})

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const dispatch = useDispatch()
   const userProfile = useSelector((state) => state.userProfile)
   const { user, loading, error: profile_error } = userProfile

   //To update useEffect when updateUserProfile action is dispatched.
   const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
   const { success, error: update_error } = userUpdateProfile

   useEffect(() => {
      if (!userInfo) {
         history.push("/login")
      }
      //user is logged in.
      else {
         if (!user?.id || success) {
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
            dispatch(getUserProfile("profile"))
            dispatch(getUnreadNotifications())
         } else {
            setFirstName(user.first_name)
            setLastName(user.last_name)
            setMobileNo(user.profile.mobile_no || "")
            setGender(user.profile.gender || "")
            setEmail(user.email)
         }
      }
   }, [user, userInfo, success, history, dispatch])

   const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) setMessage("Passwords did not match.")
      else {
         dispatch(
            updateUserProfile({
               id: user.id,
               firstName: firstName,
               lastName: lastName,
               email: email,
               mobileNo: mobileNo,
               gender: gender,
               password: password,
               profile_id: user.profile.id,
               avatar: selectedImage,
            })
         )
         setMessage("") //reset password error message
      }
   }

   const onChangeHandler = (e) => {
      setSelectedImage(e.target.files[0])
   }

   return (
      <FormContainer xs={12} md={9} lg={6}>
         <Col md={12} className="mt-5">
            <h2>My Profile</h2>
            {loading || !user?.id ? (
               <Loader />
            ) : profile_error ? (
               <div>
                  {message && <Message variant="danger">{message}</Message>}
                  {profile_error && <Message variant="danger">{profile_error}</Message>}
               </div>
            ) : (
               <div>
                  {update_error && <Message variant="danger">{update_error}</Message>}
                  {success && <Message variant="danger">{success}</Message>}

                  <Form onSubmit={submitHandler}>
                     <Form.Group as={Row} className="mb-3 mx-auto">
                        <Col md={3}>
                           <Image src={user.profile.avatar} alt={user.first_name} roundedCircle fluid />
                        </Col>
                     </Form.Group>
                     <Row className="mb-2">
                        <label htmlFor={user.id}>Update profile picture</label>
                        <input type="file" id={user.id} onChange={(e) => onChangeHandler(e)} />
                     </Row>

                     <Row className="mb-2">
                        <Form.Group as={Col}>
                           <Form.Label className="mb-0">First name</Form.Label>
                           <Form.Control
                              required
                              type="name"
                              placeholder=""
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                           />
                        </Form.Group>
                        <Form.Group as={Col}>
                           <Form.Label className="mb-0">Last name</Form.Label>
                           <Form.Control
                              required
                              type="name"
                              placeholder=""
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                           />
                        </Form.Group>
                     </Row>
                     <Form.Group className="mb-2" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                           required
                           type="email"
                           placeholder=""
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </Form.Group>

                     <Row className="mb-2">
                        <Form.Group as={Col} xs={7}>
                           <Form.Label className="mb-0">Mobile Number</Form.Label>
                           <InputGroup>
                              <InputGroup.Text>+91</InputGroup.Text>
                              <Form.Control
                                 required
                                 placeholder={!user.profile.mobileNo ? "Register Mobile No" : ""}
                                 id="mobileNo"
                                 value={mobileNo}
                                 onChange={(e) => setMobileNo(e.target.value)}
                              />
                           </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                           <Form.Label className="mb-0">Gender</Form.Label>
                           <Form.Control
                              required
                              placeholder="Gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                           />
                        </Form.Group>
                     </Row>

                     <Form.Group className="mb-2" controlId="password">
                        <Form.Label className="mb-0">Password</Form.Label>
                        <Form.Control
                           required
                           type="password"
                           placeholder="Enter Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </Form.Group>
                     <Form.Group className="mb-4" controlId="passwordConfirm">
                        <Form.Label className="mb-0">Confirm Password</Form.Label>
                        <Form.Control
                           required
                           type="password"
                           placeholder="Confirm Password"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                     </Form.Group>
                     <Form.Group as={Row} className="mb-2">
                        <Col>
                           <Button type="submit" variant="primary">
                              Update Profile
                           </Button>
                        </Col>
                     </Form.Group>
                  </Form>
               </div>
            )}
         </Col>
      </FormContainer>
   )
}
export default ProfileScreen
