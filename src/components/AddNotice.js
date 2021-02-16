import React from 'react'
import Form  from 'react-bootstrap/Form';
import  Card from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';
import {useState , useEffect} from 'react'; 
import  Jumbotron from 'react-bootstrap/Jumbotron';
import './AddEmployee.css';
import  Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FcAddDatabase} from "react-icons/fc";
import { BiChalkboard } from "react-icons/bi";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FcCheckmark} from "react-icons/fc";
import axios from "axios";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link , NavLink ,Redirect ,useHistory} from 'react-router-dom'; 
import Menu from './Menu';

 const AddNotice =(props)=>
{
    let userData , history = useHistory();
    userData =JSON.parse(localStorage.getItem("data"));
    if(!userData)  history.push("/");
    if(!userData[0].accessibility == 'Admin-User') history.push("/")

    let ctime  = new Date().toLocaleTimeString();
    let cdate  = new Date().toDateString();

    const[Noticetitle, setNoticeTitle] = useState();
    const[Noticemsg , setNoticeMsg ] = useState();

    const addNoticeTitle = (event)=>{
         setNoticeTitle( event.target.value ) 
     } 
    const addNoticeMsg = (event) =>{
         setNoticeMsg( event.target.value )
     }
        
    const handleSubmit =(e)=>{
        e.preventDefault();
         const noticeObj ={
            noticetitle  : Noticetitle,
            noticemsg    : Noticemsg,
            noticetime   : ctime,
            noticeon     : cdate,
            noticeby     : userData[0].fullname
             }          
                 
            if( Noticetitle && Noticemsg)   {
                    axios.post("http://localhost:9000/api/v1/e-res/createNotice",noticeObj).then(
                        (response)=>{
                                props.history.push("/Notice"); 
                        }).
                            catch((error)=>{ 
                            alert(error);
                        console.log(error)
                        }
                    )  
            }else{
                toast.warning(" All fields are mandatory ",{position:'top-right',height:'20px',color:'red'})
            }
    }
           
return( 
  
 <>
       < Menu />
       <Jumbotron style={{backgroundColor:'transparent'}}>
      
       <div className="main_div_addE">
          <div className="center_div_addE">
         <h4  style={{backgroundColor:'rgb(11, 5, 102)',color:'white'}}>ADD NOTICE</h4>
            <Form onSubmit = { handleSubmit }>
             <Container>
                 <Card><hr></hr>
                 <Row>
                        <Col   lg={6} xs={12} sm={6} md={6}  style={{backgroundColor:''}}>
                            <label style={{backgroundColor:'rgb(11, 5, 102)'}}>Date</label>
                                <input className="inpt11"
                                    type="text"
                                    disabled
                                    autocomplete="off"
                                    value={cdate}
                                  >
                            </input>
                        </Col>

                        <Col lg={6} xs={12} sm={6} md={6}  style={{backgroundColor:''}}>
                            <label  style={{backgroundColor:'rgb(11, 5, 102)'}}>Time</label>
                            <input className="inpt11"
                                    type="text"
                                    disabled
                                    autocomplete="off"
                                    name="fullname"
                                    value={ctime}
                             >
                            </input>
                        </Col>
                 </Row><hr></hr>
                 <Row>
                       <Col lg={12} xs={12} sm={12} md={12}>
                            <label style={{backgroundColor:'rgb(11, 5, 102)'}}>Title</label>
                            <textarea 
                              onChange={addNoticeTitle} style={{paddingLeft:'50px'}}
                            className="inpt11" style={{height:'40px',border:'1px solid rgb(39, 129, 133)'}} ></textarea>
                        </Col>
                </Row><hr></hr>
                <Row>
                       <Col lg={12} xs={12} sm={12} md={12}>
                            <label style={{backgroundColor:'rgb(11, 5, 102)'}}>Content</label>
                            <textarea
                              onChange={addNoticeMsg} style={{paddingLeft:'50px'}}
                             className="inpt11" style={{height:'100px',border:'1px solid rgb(39, 129, 133)'}} ></textarea>
                        </Col>
                </Row><hr></hr>
                <Button type="submit" variant="primary" >PUBLISH  NOTICE</Button>
                </Card>
             </Container>
              
           </Form>
          < ToastContainer >  </ToastContainer>
          </div>
       </div>
     
       </Jumbotron>

  
    </>
);
}
export default AddNotice;

{/*
  <Row>
                    </Form.Group>
                    </Col>
                </Row><hr></hr>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="2" style={{marginLeft:'15px',lineHeight:'15px'}}>
                    Notice Title
                   </Form.Label>
                    <Col sm="12">
                      <Form.Control type="text" style={{paddingLeft:'55px'}} placeholder="Enter Your Title " />
                    </Col>
                 </Form.Group>
                 <hr></hr>
                 <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="2" style={{marginLeft:'15px',lineHeight:'15px'}}>
                    Content
                   </Form.Label>
                    <Col sm="12">
                     <textarea placeholder="Enter Your Message" style={{width:'700px',height:'100px',paddingLeft:'45px'}}></textarea>
                    </Col>
                 </Form.Group>
                 <Button style={{float:'right'}}>SAVE</Button>


*/}