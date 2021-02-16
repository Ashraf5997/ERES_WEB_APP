
import React ,{useState} from 'react';

import './MyProfile.css'
import  Jumbotron from 'react-bootstrap/Jumbotron';
import  Button  from 'react-bootstrap/Button';
import  Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { FcCheckmark } from "react-icons/fc";
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
import {BsFillLightningFill} from 'react-icons/bs';
import {BsFillImageFill} from 'react-icons/bs';
import Menu from './Menu';
const Axios = require('axios').default;
 const MyProfile=(props)=>{
 
  let userData =JSON.parse(localStorage.getItem("data"));
  if(!userData)  props.history.push("/"); 
  
  ///// GO TO ADD NEW EMPLOYEE
 const addEmp=(e)=>{
  e.preventDefault();
   props.history.push("/AddEmployee");
 }

 //////// GO TO 
 const ToDo = (e)=>{
  e.preventDefault();
  props.history.push("/ToDo");
 }
    return(
     <>
        <Menu/> 
        <br></br><br></br>
      <Container>
       <Row style={{backgroundColor:''}}>

           {/*  FIRST COL*/ }

           <Col  xs={12} sm={6} md={4} lg={4}  style={{backgroundColor:''}}>
              <Card  >
               <Card.Header className="Cards"><BsFillPersonLinesFill  /></Card.Header>
                  <Card.Body>
                                 <Col lg={6} xs={12} sm={6} md={6} >
                                    <label className="datalabel">User Id :  {userData[0].id}</label>
                                </Col><br></br>
                               <Col lg={6} xs={12} sm={6} md={6} >
                                    <label className="datalabel">Fullname :  {userData[0].fullname}</label>
                            
                                </Col><br></br>

                                <Col lg={6} xs={12} sm={6} md={6} >
                                    <label>Email :  {userData[0].email} </label>
                                </Col><br></br>
                        
                            <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>Office Id :  {userData[0].Id_no}</label>
                            </Col> <br></br>

                             <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>Degree :  {userData[0].qualification}</label>
                            </Col><br></br>

                            <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>Designation :  {userData[0].designation}</label>
                            </Col>  
                 </Card.Body>
                </Card>
           </Col>

           {/* SECOND COL*/}
           <Col xs={12} sm={6} md={4} lg={4}  style={{backgroundColor:''}} >
              <Card>
                  <Card.Header className="Cards"><BsFillLightningFill /></Card.Header>
                  <Card.Body>
                        
                            <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>Contact :  {userData[0].contact} </label>
                            </Col><br></br>

                            <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>Age :  {userData[0].age}</label>
                            </Col><br></br>

                            <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>State :  {userData[0].address}</label>
                            </Col> <br></br>

                             <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>Accessibility :  {userData[0].accessibility} </label>
                            </Col><br></br>
                            
                            <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>Created On :  {userData[0].createdon}</label>
                            </Col><br></br>

                            <Col lg={6} xs={12} sm={6} md={6} >
                                 <label>Password :  {userData[0].password}</label>
                            </Col>  

                  </Card.Body>
              </Card>  
           </Col>

           {/* THIRD COL */ }
           <Col xs={12} sm={6} md={4} lg={4}  style={{backgroundColor:''}} >
             <Card>
                  <Card.Header className="Cards"><BsFillImageFill /></Card.Header>
                  <Card.Body>
                  
                          <BsPersonBoundingBox style={{width:'250px',height:'350px',paddingLeft:'60px',color:'lightseagreen'}}  />     

                  </Card.Body>
              </Card>  
           </Col>

         </Row>   <hr />
         
        </Container>
      
     </>

    );

}
export default MyProfile;