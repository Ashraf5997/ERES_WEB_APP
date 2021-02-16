
import React ,{useState} from 'react';
import { Link , NavLink ,Redirect ,useHistory} from 'react-router-dom'; 
import './LandingPage.css';
import  Jumbotron from 'react-bootstrap/Jumbotron';
import  Button  from 'react-bootstrap/Button';
import  Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { FcBusinessman } from "react-icons/fc";
import { FcFaq } from "react-icons/fc";
import { FcPrivacy } from "react-icons/fc";
import axios from "axios";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BsCalendar } from 'react-icons/bs';
import {BsPersonBoundingBox} from 'react-icons/bs';
import {BsPersonPlusFill} from 'react-icons/bs';
import {BsPencilSquare} from 'react-icons/bs';
import {BsNewspaper} from 'react-icons/bs';
import { AiFillMedicineBox} from "react-icons/ai";
import Menu from './Menu';
const Axios = require('axios').default;

 const CrudLanding=(props)=>{

  let userData , history=useHistory();
  userData = JSON.parse(localStorage.getItem("data"));
  if(!userData)  history.push("/");
  
  ///// GO TO ADD NEW EMPLOYEELIST
 const EditDelEmp=(e)=>{
  e.preventDefault();
   props.history.push("/EmployeeList");
 }

 //////// GO TO AddEMPLOYEE
 const AddEmp = (e)=>{
  e.preventDefault();
  history.push("/AddEmployee");
 }
    return(
     <>
        <Menu/> 
        <br></br><br></br>
        <Container>
          <Row style={{backgroundColor:''}}>
              

                <Col  xs={12} sm={6} md={6} lg={6}  style={{backgroundColor:''}}>
                   <Card  >
                        <Card.Header className="Cards"><BsFillPeopleFill /></Card.Header>
                          <Card.Body>
                            <Card.Title>Add New Employee</Card.Title>
                            <Card.Text>
                                 To  add new  employee click on click me button
                            </Card.Text>
                            <Button variant="outline-info" onClick={AddEmp} >Click me</Button>
                        </Card.Body>
                   </Card>
                </Col>

                <Col  xs={12} sm={6} md={6} lg={6}  style={{backgroundColor:''}}>
                   <Card  >
                        <Card.Header className="Cards"><BsPencilSquare/></Card.Header>
                          <Card.Body>
                            <Card.Title>Update And Delete Employees</Card.Title>
                            <Card.Text>
                             To update and delete employee click on click me button
                            </Card.Text>
                            <Button variant="outline-info" onClick={EditDelEmp} >Click me</Button>
                        </Card.Body>
                   </Card>
                </Col>
              
           
              
         </Row>   <hr />
          <Row style={{backgroundColor:''}} >
          <Col  xs={12} sm={6} md={6} lg={6}  style={{backgroundColor:''}}>
                   <Card  >
                        <Card.Header className="Cards"><AiFillMedicineBox/>< BsPersonBoundingBox /></Card.Header>
                          <Card.Body>
                            <Card.Title>Add Notice</Card.Title>
                            <Card.Text>
                             To add notice click on click me button
                            </Card.Text>
                            <Button variant="outline-info">Click me</Button>
                        </Card.Body>
                   </Card>
                </Col>
                <Col  xs={12} sm={6} md={6} lg={6}  style={{backgroundColor:''}}>
               <Card>
                        <Card.Header className="Cards">< BsCalendar/></Card.Header>
                        <Card.Body>
                            <Card.Title>Update And Delete Notice</Card.Title>
                            <Card.Text>
                              To update and delete notice click on click me button.
                            </Card.Text>
                            <Button variant="outline-info">Click me</Button>    
                        </Card.Body>
              </Card>
              </Col> 
         </Row>
        </Container>
      
     </>

    );

}
export default CrudLanding;