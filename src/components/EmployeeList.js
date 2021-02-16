
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
import { FiX} from "react-icons/fi";
import Menu from './Menu';
import { Link , NavLink ,Redirect , useHistory} from 'react-router-dom'; 
  const Axios = require('axios').default;

  const EmployeeList=(props)=>{

  let userData ,access , history= useHistory();
  const  [ userId , setUserId]     = useState();
  const  [ actionDiv , setActionDiv] = useState(false)
  const  [ isDeleted , setDelete]  = useState();
  const  [ confirmdel , setConfirmdel]  = useState(false);
  const  [ Loader,setLoader]  =  useState();
  const  [ ListData , setListData]   = useState([]);
  userData=JSON.parse(localStorage.getItem("data"));
  
  if(!userData) history.push("/") 
  if(userData) access = userData[0].accessibility;

  useEffect(() => {
    fetchEmpList()
  }, [])
/// confirm del
const confrimDel = ()=>{
   (confirmdel)?setConfirmdel(false):setConfirmdel(true);
 
}   
//////// DELETE Employee   ///////
 const DelEmp = (  )=>{
       axios.delete('http://localhost:9000/api/v1/e-res/'+userId).then(
               (response)=>{
                   if(response.data == 400){
                       toast.error(" Error obatined try later ! ",{position:'bottom-center'}) 
                   }
                   else{
                       let data = response.data;
                       fetchEmpList() 
                       setDelete(true)
                       setActionDiv(false)
                      // toast.success(" Data deleted successfully ! ",{position:'bottom-center'}) 
                   }
               }).
               catch((error)=>{ 
                 toast.error(" Error obatined try later ! ",{position:'bottom-center'}) 
                   // alert(error);
                    console.log(error)      
               }
            )  
  }

 //////// FETCH  USERDATA   ///////
  const fetchEmpList =() => {
     // fetching EmployeesData
     setLoader(true);
     axios.get("http://localhost:9000/api/v1/e-res/employees").then(
                (response)=>{
                    if(response.data == 400){
                        toast.error(" Error occured try later  ! ",{position:'bottom-center'}) 
                        setLoader(false);
                    }
                    else{
                        let data = response.data;
                        setListData(data);         
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

/////// CLOSE ACTION DIV 
 const closeActionContainer = (e)=>{
  e.preventDefault();
  setActionDiv(false);
  //history.push("/AddEmployee");
 }
  
/////// SELECT LINE
 const selectLine = (userid)=>{
  setUserId(userid);
  setActionDiv(true);
  //history.push("/AddEmployee");
 }


 //////// GO TO Add EMPLOYEE
 const AddEmployee = (e)=>{
  e.preventDefault();
  history.push("/AddEmployee");
 }

 //////// GO TO EDIT EMPLOYEE
 const EditEmp = ()=>{
  history.push(`/EditEmployee/${userId}`);
 }

 //////// GO TO ToDo
 const ToDo = ()=>{
  history.push(`/ToDo/${userId}`);
 }
  //////// GO TO ATTENDANCE
  const Attendance = ()=>{
    history.push(`/Attendance/${userId}`);
   }

 //////// GO TO VIEW EMPLOYEE
 const ViewEmp = ()=>{
  history.push(`/ViewEmployee/${userId}`);
 }
    return(
     <>  
       <Menu/> 
        
{/* Displaying Spinners Andrew And */}

 {Loader?
 <div className="Spinner"> 
    <img src={spinner} />Please wait...<br></br>  
 </div>
: <div>
  {
    // CHECKING ACTION DIV IS TRUE
    (actionDiv)?
    <Jumbotron style={{backgroundColor:'transparent'}}>
<div className="main_div_Table" >       
<Card style={{marginTosp:"50px",border:'.5px solid rgb(11, 5, 102)'}}> 
   <Container>
     <h4 style={{backgroundColor:"rgb(11, 5, 102)",color:'white',paddingLeft:'50px',marginTop:'10px'}}>
     <FaUserEdit  /> Action Container </h4>
      <Row>
      <Col> 
      { (access == "Admin-User")?
         <p><input onClick={confrimDel} type="checkbox"/> Delete</p>
         :" "}
      </Col>
        <Col style={{textAlign:'right'}}> 
          <button onClick ={closeActionContainer} style={{backgroundColor:'rgb(11, 5, 102)',color:'white'}}>< FiX/></button>
        </Col>
      </Row>
  </Container>
    <Container>
        <Card style={{textAlign:'center',marginTop:'0px'}}>
        <Card.Body>
            <Card.Title style={{color:'orange'}}>Hi.. {userData[0].fullname}</Card.Title>
            <Card.Text>
            What to do with Id : {userId} ?
            </Card.Text>
                { (access == "Admin-User")?
                   <Row>
                   <Col xm={12} md={4} xm sm={4} lg={4} xl={4}  >
                        <Button  onClick={()=>ViewEmp()}  style={{width:'110px'}} variant="outline-info">< FaEye/> VIEW</Button>
                   </Col>
                  
                 <Col xm={12} md={4} xm sm={4} lg={4} xl={4}>
                     <Button onClick={()=>EditEmp()}  style={{width:'110px'}} variant="outline-info"> <FaUserEdit/> EDIT</Button>
                </Col>
                <Col xm={12} md={4} xm sm={4} lg={4} xl={4}>
                  { (confirmdel)?
                      <Button style={{width:'110px'}}   onClick={()=>DelEmp() }    variant="outline-danger">< BsFillTrashFill/>DELETE</Button>
                      :<Button style={{width:'110px'}} disabled variant="outline-danger">< BsFillTrashFill/>DELETE</Button>
                   } 
                  </Col> 
                  </Row> 
                 :
                 <Row>
                 <Col xm={12} md={4} xm sm={4} lg={4} xl={4}  >
                      <Button  onClick={()=>ViewEmp()}  style={{width:'110px'}} variant="outline-info">< FaEye/> VIEW</Button>
                 </Col>
                 </Row>
                 }
              
           <hr></hr>  
           <Row>
                <Col xm={12} md={6} xm sm={6} lg={6} xl={6}  >
                     <Button onClick={Attendance}  style={{width:'180px'}} variant="outline-info">ATTENDANCE</Button>
                </Col>
                 <Col xm={12} md={6} xm sm={6} lg={6} xl={6}>
                      <Button onClick={ToDo} style={{width:'180px'}} variant="outline-info">WORK STATUS</Button>
                </Col>    
           </Row>  
        </Card.Body>
     </Card>
     </Container>
  </Card>
</div>
  </Jumbotron>
    :
    <div>
  
        <br></br><br></br>
     {(isDeleted)?<Container style={{width:'450px'}}><Alert variant="success" onClose={() => setDelete(false)} dismissible>
         Data Deleted Sussessfully!
       
      </Alert></Container>:""}
   <ToastContainer />
    <div className="main_div_Table">
      <div className="center_div_Table">
         <Card>
         <Card.Header className="Cards"><BsFillPeopleFill />
         </Card.Header>
           
         <Card.Title style={{textAlign:'center',color:'rgb(39, 129, 133)',fontWeight:'bold',marginTop:'-20px'}}>List Of Employee</Card.Title>
           <Card.Body style={{marginTop:'0px'}}>
           {(access == "Admin-User")?<div>
                   <Button onClick={AddEmployee} style={{backgroundColor:'rgb(11, 5, 102)'}}>< BsPersonPlusFill/> Add Employee </Button> 
            </div>:""}           
              <Table striped bordered hover size="sm">
                 <thead style={{backgroundColor:'rgb(11, 5, 102)',color:'white'}}>
                    <tr>
                      <th>S.No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>User Id</th>
                        <th>Office Id</th>
                       
                    </tr>
                 </thead>
                 <tbody>
                 {
                   ListData.map((userdata , index)=>(
                  // alert(userdata.fullname) }
                  <tr className="empLine" onClick={(e)=>{selectLine(userdata.id)}}>

                        <td>{index+1 }</td>
                        <td>{userdata.fullname}</td>
                        <td>{userdata.email}</td>
                        <td>{userdata.id }</td>
                        <td>{userdata.Id_no}</td>
                   </tr>
                   )) 
                 }              
                   </tbody>
                </Table>
               
           </Card.Body>
        </Card>
     </div>
  </div>

  </div>}

</div>
}                    
     </>

    );

}
export default EmployeeList;