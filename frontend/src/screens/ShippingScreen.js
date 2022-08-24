import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap"

import { saveShippingAddress } from "../actions/cartActions"

import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"

function ShippingScreen({ history }) {
   const cart = useSelector((state) => state.cart)
   const { shippingAddress } = cart

   const [fullName, setFullName] = useState(shippingAddress.full_name)
   const [mobileNo, setMobileNo] = useState(shippingAddress.mobile_no)
   const [pincode, setPincode] = useState(shippingAddress.pincode)
   const [building, setBuilding] = useState(shippingAddress.building)
   const [area, setArea] = useState(shippingAddress.area)
   const [landmark, setLandmark] = useState(shippingAddress.landmark)
   const [city, setCity] = useState(shippingAddress.city)
   const [state, setState] = useState(shippingAddress.state)
   const [addressType, setAddressType] = useState(shippingAddress.address_type)

   const dispatch = useDispatch()

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(
         saveShippingAddress({
            fullName,
            mobileNo,
            pincode,
            building,
            area,
            landmark,
            city,
            state,
            addressType,
         })
      )
      history.push("/payment")
   }

   return (
      <FormContainer xs={12} md={10} lg={8}>
         <CheckoutSteps step1 step2 />
         <Row>
            <Col lg={8} className="mx-auto">
               <h2 className="my-2">Shipping</h2>
               <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-2" controlId="fullName">
                     <Form.Label className="mb-0">Full Name</Form.Label>
                     <Form.Control
                        required
                        type="text"
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                     />
                  </Form.Group>

                  <Row className="mb-2">
                     <Form.Group as={Col} xs={7}>
                        <Form.Label className="mb-0">Mobile Number</Form.Label>
                        <InputGroup className="mb-2">
                           <InputGroup.Text>+91</InputGroup.Text>
                           <Form.Control
                              required
                              placeholder="10-digit mobile number"
                              id="mobileNo"
                              value={mobileNo}
                              onChange={(e) => setMobileNo(e.target.value)}
                           />
                        </InputGroup>
                     </Form.Group>

                     <Form.Group as={Col}>
                        <Form.Label className="mb-0">Pincode</Form.Label>
                        <Form.Control
                           required
                           placeholder="6 digits (0-9) PIN code"
                           value={pincode}
                           onChange={(e) => setPincode(e.target.value)}
                        />
                     </Form.Group>
                  </Row>

                  <Form.Group className="mb-2" controlId="building">
                     <Form.Label className="mb-0">Flat, House no., Building, Company</Form.Label>
                     <Form.Control
                        required
                        type="text"
                        placeholder=""
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                     />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="area">
                     <Form.Label className="mb-0">Area, Street, Village</Form.Label>
                     <Form.Control
                        required
                        type="text"
                        placeholder=""
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                     />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="Landmark">
                     <Form.Label className="mb-0">Landmark</Form.Label>
                     <Form.Control
                        required
                        type="text"
                        placeholder="E.g. Near Salbagan market"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                     />
                  </Form.Group>

                  <Row className="mb-2">
                     <Form.Group as={Col}>
                        <Form.Label className="mb-0">City/Town</Form.Label>
                        <Form.Control
                           required
                           type="text"
                           placeholder=""
                           value={city}
                           onChange={(e) => setCity(e.target.value)}
                        />
                     </Form.Group>

                     <Form.Group as={Col} className="mt-4">
                        <Form.Label className="mr-5">State </Form.Label>
                        <Form.Control
                           as="select"
                           className="mx-2"
                           id="stateSelect"
                           value={state}
                           placeholder="Select one state"
                           custom
                           onChange={(e) => {
                              setState(e.target.value)
                           }}
                        >
                           <option>Select a state</option>
                           {[
                              "Andhra Pradesh",
                              "Arunachal pradesh",
                              "Assam",
                              "Bihar",
                              "Chhattisgarh",
                              "Goa",
                              "Gujarat",
                              "Haryana",
                              "Himachal Pradesh",
                              "Jharkhand",
                              "Karnataka",
                              "Kerala",
                              "Madhya Pradesh",
                              "Maharashtra",
                              "Manipur",
                              "Meghalaya",
                              "Mizoram",
                              "Nagaland",
                              "Odisha",
                              "Punjab",
                              "Rajasthan",
                              "Sikkim",
                              "Tamil Nadu",
                              "Telangana",
                              "Tripura",
                              "Uttar Pradesh",
                              "Uttarakhand",
                              "West bengal",
                           ].map((st) => (
                              <option value={st} key={st}>
                                 {st}
                              </option>
                           ))}
                        </Form.Control>
                     </Form.Group>
                  </Row>

                  <Form.Group className="mb-3">
                     <Form.Label className="mt-2">Address Type </Form.Label>
                     <Form.Control
                        as="select"
                        className="mx-2"
                        value={addressType}
                        placeholder="Select address type"
                        id="addressTypeSelect"
                        required
                        custom
                        onChange={() => {
                           setAddressType(addressType)
                        }}
                     >
                        <option>Select Address Type</option>
                        <option value="Home">Home (7 am- 10 pm delivey)</option>
                        <option value="Work">Work (10 am- 6 pm delivey) </option>
                     </Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Col>
                        <Button type="submit" variant="primary">
                           Save and Deliver here
                        </Button>
                     </Col>
                  </Form.Group>
               </Form>
            </Col>
         </Row>
      </FormContainer>
   )
}
export default ShippingScreen
