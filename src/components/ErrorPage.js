
import React from 'react'
import Form  from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import  Jumbotron from 'react-bootstrap/Jumbotron';
import  Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FcAddDatabase} from "react-icons/fc";
import { FcList} from "react-icons/fc";
import {FcCheckmark} from "react-icons/fc";
import { BsFillPersonPlusFill } from "react-icons/bs";
import './ErrorPage.css';


export const ErrorPage =()=>
{
  return(
  	<>     
  	   <div className="main_div">
  	     <div className="center_div">
              
                <Row>
                  <Col  lg={6} xs={12} sm={6} md={6} >
                        <h1 className="para11">PAGE NOT FOUND</h1>
                        
                  </Col>
                 
               </Row>
                <h1 style={{color:"red"}} className="para1s1">404</h1>
  	     </div>
  	   </div>
  	   

  	</>
      
  );
}

export default ErrorPage;