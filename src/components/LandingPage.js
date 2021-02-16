import React ,{useState , useEffect }from 'react';
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
import { Link , NavLink ,Redirect ,useHistory} from 'react-router-dom'; 
import {BsNewspaper} from 'react-icons/bs';
const Axios = require('axios').default;

 const LandingPage=(props)=>{
  let  userData , access , history =useHistory()

  userData =JSON.parse(localStorage.getItem("data"));
  if(!userData)  history.push("/");
  if(userData)access=userData[0].accessibility; 

 const signOut=(e)=>{
  e.preventDefault();
   localStorage.setItem("data",null);
   history.push("/");
 }
 /// GO TO CRUD
 const Notice=(e)=>{
  e.preventDefault();
  history.push("/Notice"); 
  
}

   /// GO TO MyProfile
 const MyProfile=(e)=>{
  e.preventDefault();
   history.push("/MyProfile"); 
   
  }

   /// GO TO EMPLIST
 const EmpList=(e)=>{
  e.preventDefault();
   history.push("/EmployeeList"); 
   
  }

 //////// Go to DOlISt
 const ToDo = (e)=>{
  e.preventDefault();
  props.history.push(`/ToDo/${userData[0].id}`);
 }
 
 //////// Go To  Attendance
 const Attendance = (e)=>{
  e.preventDefault();
  props.history.push(`/Attendance/${userData[0].id}`);
 }

    return(
     <>
       
          <Row>
              <Col xs={12} sm={8} md={8} lg={8} style={{  backgroundColor:'rgsb(39, 129, 133)'}}>
             
             {(userData)?<p style={{textAlign:'left',padding:'10px',fontSize:'15px',color:'white'}}>welcome : {userData[0].fullname}</p>:""}
              </Col>
              <Col  xs={12} sm={4} md={4} lg={4} style={{backgroundColor:'rgsb(39, 129, 133)'}}>
                    <div style={{float:'Right',padding:'10px',color:'white'}}>
                     Sign-out  <Button  variant="light" onClick={signOut} > < FcPrivacy/></Button>
                    </div>
              </Col>
          </Row>

    <hr  /><br></br>
        
        <Container>
          <Row style={{backgroundColor:''}}>
                <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                        <Card className="cardbody"   >
                                <Card.Header className="Cards"  ><BsFillPersonLinesFill /></Card.Header>
                                <Card.Body> 
                                    <Card.Title className="cardtitle"> My Profile</Card.Title>
                                    <Card.Text>
                                    To view details about your profile click on click me button
                                    </Card.Text>
                                    <Button onClick={MyProfile} variant="outline-info">Click me</Button>
                                </Card.Body>
                        </Card>
                </Col>

                <Col  xs={12} sm={6} md={6} lg={4}  style={{backgroundColor:''}}>
                   <Card className="cardbody"  >
                        <Card.Header className="Cards"><BsFillPeopleFill /></Card.Header>
                          <Card.Body>
                            <Card.Title  className="cardtitle">Employees </Card.Title>
                            <Card.Text>
                                 To view and manage  employees  sheet click on click me button
                            </Card.Text>
                            <Button onClick={EmpList} variant="outline-info">Click me</Button>
                        </Card.Body>
                   </Card>
                </Col>

                <Col  xs={12} sm={6} md={6} lg={4}  style={{backgroundColor:''}}>
                   <Card className="cardbody" >
                        <Card.Header className="Cards">< BsCalendar/></Card.Header>
                          <Card.Body>
                            <Card.Title  className="cardtitle">Attendance </Card.Title>
                            <Card.Text>
                             To view and manage your attendance sheet click on click me button
                            </Card.Text>
                            <Button onClick={Attendance}  variant="outline-info">Click me</Button>
                        </Card.Body>
                   </Card>
                </Col>

         </Row><br></br>
          <Row style={{backgroundColor:''}} >
         
                <Col  xs={12} sm={6} md={6} lg={6}  style={{backgroundColor:''}}>
               <Card className="cardbody">
                        <Card.Header className="Cards"><BsPencilSquare/></Card.Header>
                        <Card.Body>
                            <Card.Title  className="cardtitle">To Do </Card.Title>
                            <Card.Text>
                              To view and manage task sheet  click on click me button.
                            </Card.Text>
                            <Button onClick={ToDo} variant="outline-info">Click me</Button>    
                        </Card.Body>
              </Card>
              </Col>
              <Col  xs={12} sm={6} md={6} lg={6} style={{backgroundColor:''}}>
                <Card className="cardbody" >
                        <Card.Header className="Cards"><BsPersonPlusFill/></Card.Header>
                        
                        <Card.Body>
                           
                            <Card.Title  className="cardtitle"> Notice </Card.Title>
                            <Card.Text>
                            To  view and manage Notice 
                            click on click me button
                            
                            </Card.Text>
                            <Button variant="outline-info" onClick={Notice}>Click me</Button>
                            <ToastContainer/>
                        </Card.Body>
               </Card>
               </Col>
         </Row>
        </Container>
      
     </>

    );

}
export default LandingPage;