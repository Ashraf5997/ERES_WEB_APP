
import React ,{useState , useEffect } from 'react';
import './Home.css';
//import '../App.css';
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
import { FcUnlock } from "react-icons/fc";
import axios from "axios";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spinner from '../Spinners/VeryfySpinner.gif';
import ImageSlider from './ImageSlider';
import { Link , NavLink ,Redirect ,useHistory} from 'react-router-dom'; 

const Axios = require('axios').default;

export const Home = (props) => {
  const date  =   new Date();
 // const day = date.getYear()+1;  console.log(day)
  let userData,history=useHistory();
  userData =JSON.parse(localStorage.getItem("data"));
  if(userData)  props.history.push("/LandingPage");

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const [Loader,setLoader]=useState()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Digital Clock
  let time = new Date().toLocaleTimeString();
  const [currentTime,updateCTime] = useState(time);
  const updateTime = ()=>{
      time = new Date().toLocaleTimeString();
      updateCTime(time);
  
  } 
  setInterval(updateTime , 1000 );
  let TodayDate = new Date();
  let curDate = new Date();
  curDate = curDate.getHours();
  let greetingstatus = '';
  let greetingmsg ='';
  const cssStyle={};

  if(curDate >= 1 &&  curDate <12){
     greetingstatus="Good Morning Sir... "; greetingmsg = "I hope your morning is as bright as your  smile 🙂 ";
     cssStyle.color = "orange";
    }
  else if(curDate >= 12 && curDate < 19){
    greetingstatus="Good Afternoon Sir... "; 
    greetingmsg = "God woke you up today. Count your blessings like you count your money 😅";
    cssStyle.color = "green";
  }else{
    greetingstatus="Good Night Sir... "; 
    greetingmsg = "You are such a good Person ! May the night you have contain only good things 🙂";
    cssStyle.color = "black";
    
  }
   const [ Values,  setValues] = useState({
        password  : '',
        email     : '',
   })

   const handleChanges =(e)=>{
        const{name,value} = e.target;
         setValues({
            ...Values,
            [name]:value
       })  
      }    

  const handleSubmit = (e)=>{
     e.preventDefault();
      if(Values.email && Values.password){
       setLoading(true)
           axios.post("http://localhost:9000/api/v1/e-res/userAuthentication",Values).then(
                      (response)=>{
                          if(response.data == 400){
                              toast.error(" Invalid credentials ! ",{position:'bottom-center'}) 
                              setLoader(false);
                          }
                          else{
                              let data = response.data
                              localStorage.setItem("data",JSON.stringify(data));
                              // alert(JSON.stringify(data))
                              setLoader(false);
                              history.push("/LandingPage");
                          }

                      }).
                      catch((error)=>{ 
                           alert(error);
                           console.log(error)
                      }
                      )                
      }else
      {
         toast.warning(" Please provide your credentials ! ",{position:'top-left'})   
      }
  };
return (
 <div>
 
{/* Displaying Spinner */}

{Loader?
<div className="Spinner">
<img src={spinner} /><br></br>
</div>
:<div>
          <Jumbotron className="jumbotron" >
              <Container><div >
                  <Row>
                      <Col xs={3} sm={2} md={2} lg={1} style={{background:'blacsk'}} >
                      <img src="/officeImages/officeLogo.png" className="logo" />
                      </Col>
                      
                      <Col  lg={2} xs={5} sm={4} md={2 }style={{background:'blacsk'}}>
                      <h1 className="heading1">E-RES</h1>
                      <p>   {currentTime}</p> 
                      </Col>  
                  </Row>
                  </div></Container>  
                  <p className="hp1">
                    Employee's Register of Ecommplify Solution  
                  </p>
            </Jumbotron>
        
            <Container>
  
  <Row style={{backgroundColor:'',hight:'100px'}}>
    <Col xs={12} sm={6} md={6} lg={6} > 
    <div className=""  >      
    <p style={ cssStyle }  className="wishingTag"> 
       <FcBusinessman className="fcassistant" />
        {greetingstatus}
    </p>
    <p style={ cssStyle } className="wishingTag1">
       < FcFaq className=" fcassistant" /> 
       {greetingmsg}   
    </p>
   <hr />

           <div className="" style={{backgroundColor:'',height:'260px'}}>
                  
                <h5 style={{color:'black',marginLeft:'110px'}}> <FcUnlock style={{fontSize:'22px'}} /></h5>
                     <h5  style={{marginLeft:'90px',color:'orange'}}>sign-in </h5>
                          
                        <Form className="formlogin" >
                                  
                         <input type ="text"   name="email" className="inpt1" placeholder="Enter cloudex email"
                           autocomplete="off" onChange={handleChanges}></input><hr/>
                                
                         <input type ="password" name="password" className="inpt1" placeholder="Enter password" 
                          onChange={handleChanges}></input>
                          < hr/>
                                 <Button type="submit" className="btnsubmit"
                                  disabled={isLoading}
                                  onClick={ !isLoading ? handleSubmit : null}
                                  variant="outline-info" >
                                    {isLoading ? 'Veryfying..' : 'Login'}
                                 </Button>

                                 <  ToastContainer/><hr/>
                                 <a style={{border:'none'}} href="#"onClick={handleShow}>Forgot Password ?</a>   
                        </Form>
          </div>
   </div>
           
    </Col>
    <Col xs={12} sm={6} md={6} lg={6}  style={{radius:'50px'}}>
      {/*<img src="/officeImages/pic1.png" className="pic1"/>*/}
      <ImageSlider/>

    </Col>
   
  </Row>

{/* MODAL POPUP */} 
<Container> 
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
           <Form className="">
                   <Form.Group controlId="formGroupEmail">
                        <div className="para1">
                            <p1 className=""> Please provide your registerd email</p1><br />
                            <p1 className=""> Your password will send  to it</p1><br /><br />
                        </div><hr />
                         <Form.Label>Email address</Form.Label>
                        {/*<Form.Control type="email" placeholder="Enter email" className="inpt1" />*/}
                         <input type="email" name="email" placeholder="type here..." className="inpt1"/>
                  </Form.Group>
           </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info">Proceed</Button>
        </Modal.Footer>
      </Modal>
      </Container>
 {/*END MODAL */}
</Container>  
</div>}  
</div>
 

    )}
export default Home;
