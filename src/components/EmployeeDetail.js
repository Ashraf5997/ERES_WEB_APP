
import React ,{useState , useEffect} from 'react';
import './LandingPage.css';
import '../App.css';
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
import { FcDeleteRow} from "react-icons/fc";
import { FcPrivacy } from "react-icons/fc";
import axios from "axios";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BsFillTrashFill} from 'react-icons/bs';
import {BsPersonBoundingBox} from 'react-icons/bs';
import {BsPersonPlusFill} from 'react-icons/bs';
import {BsPencilSquare} from 'react-icons/bs';
import {BsNewspaper} from 'react-icons/bs';
import { AiFillMedicineBox} from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { FaEye} from "react-icons/fa";
import spinner from '../Spinners/VeryfySpinner.gif';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert'
import Menu from './Menu';
import { useParams,Link , NavLink ,Redirect , useHistory} from 'react-router-dom'; 
  const Axios = require('axios').default;

  const EmployeeDetail=(props)=>{

  let userData , history= useHistory(); 
  const {id} = useParams();
  const [invalidId,setinvalidId]=useState(false);
  const [Loader,setLoader]=useState();
  const [ DetailData , setDetailData] =useState([0]);
  userData=JSON.parse(localStorage.getItem("data"));
  
  if(!userData) history.push("/") 


  useEffect(() => {
    fetchEmpDetail()
  }, [])


  //////// FETCH  USERDATA   ///////
  const fetchEmpDetail =() => {
  // fetching EmployeesData Detail
  setLoader(true);
  axios.get("http://localhost:9000/api/v1/e-res/employee/"+id).then(
                (response)=>{
                    if(response.data == 400){
                        toast.error(" Error occured try later  ! ",{position:'bottom-center'}) 
                        setLoader(false);
                    }
                    else{
                        let data = response.data;
                           
                        if(data.success == 404){setinvalidId(true)} 
                        else{
                          setDetailData(data);         
                        }
                        setLoader(false);  
                    }
                }).
                catch((error)=>{ 
                     alert(error);
                     console.log(error)
                     setLoader(false);  
                }
                )  
  }
    return(
     <>   
{/* Displaying Spinner */}

 {Loader?
 <div className="Spinner"> 
    <img src={spinner} />Please wait...<br></br>   
 </div>
: <div>
        <Menu/> 
        <br></br><br></br>
    
    <div className="main_div_Table">
     {(invalidId)?`EMPLOYEE NOT FOUND WITH ID ${id}`:
      <div className="center_div_Table">
         <Card>
         <Card.Header className="Cards"><BsFillPeopleFill />
         </Card.Header>
           
         <Card.Title style={{textAlign:'center',color:'rgb(39, 129, 133)',fontWeight:'bold',marginTop:'-20px'}}>Detail Of Employee</Card.Title>
          <Card.Body style={{marginTop:'-10px'}}>
            <Container>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                        <label style={{backgroundColor:'white', color:'black'}}>Full Name : {DetailData[0].fullname}</label>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={5} style={{backgroundColor:''}}>
                        <label style={{backgroundColor:'white', color:'black',width:'350px'}}>Email :  {DetailData[0].email}</label> 
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                    <label style={{backgroundColor:'white', color:'black'}}>Contact :  {DetailData[0].contact}</label> 
                    </Col>
                   
                </Row><br></br>

                <Row>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                    <label style={{backgroundColor:'white', color:'black'}}>User Id :  {DetailData[0].id}</label>  
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                    <label style={{backgroundColor:'white', color:'black'}}>Office Id :  {DetailData[0].Id_no}</label>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                    <label style={{backgroundColor:'white', color:'black'}}>Age : {DetailData[0].age}</label>  
                    </Col>
                   
                </Row><br></br>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                      <label style={{backgroundColor:'white', color:'black'}}>State. :  {DetailData[0].address}</label>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                    <label style={{backgroundColor:'white', color:'black'}}>Degree :  {DetailData[0].qualification}</label>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                    <label style={{backgroundColor:'white', color:'black'}}>Designation:  {DetailData[0].designation}</label>
                    </Col>
                   
             </Row><br></br>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                      <label style={{backgroundColor:'white', color:'black'}}>Accessibility :  {DetailData[0].accessibility}</label>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                    <label style={{backgroundColor:'white', color:'black'}}> Created By: {DetailData[0].createdby}</label>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} style={{backgroundColor:''}}>
                    <label style={{backgroundColor:'white', color:'black',height:'50px'}}>Created On :  { DetailData[0].createdon }</label>
                    </Col>
                </Row>
            </Container>    
           </Card.Body>
        </Card>
     </div>}
     
  </div>

</div>}
                    
     </>

    );

}
export default EmployeeDetail;