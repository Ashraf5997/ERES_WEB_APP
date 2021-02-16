
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
import { BiChalkboard } from "react-icons/bi";
import axios from "axios";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BsFillTrashFill} from 'react-icons/bs';
import {BsPersonBoundingBox} from 'react-icons/bs';
import {BsPersonPlusFill} from 'react-icons/bs';
import {BsPencilSquare} from 'react-icons/bs';
import {AiFillFolderAdd} from 'react-icons/ai';
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

  const Notice=(props)=>{

  let userData ,access , history= useHistory();
  userData=JSON.parse(localStorage.getItem("data"));
  if(!userData) history.push("/") 


  let ctime  = new Date().toLocaleTimeString();
  let cdate  = new Date().toDateString();

  const  [ noticeId , setNoticeId]     = useState();
  const  [ actionDiv , setActionDiv] = useState(false)
  const  [ isDeleted , setDelete]  = useState(false);
  const  [ confirmdel , setConfirmdel]  = useState();
  const  [ Loader,setLoader]  =  useState();
  const  [ ListData , setListData]   = useState([]);
  
  if(userData) access = userData[0].accessibility;

  useEffect(() => {
    fetchAllNotices()
  }, [])

/// confirm del
const confrimDel = ()=>{
   (confirmdel)?setConfirmdel(false):setConfirmdel(true);
 
}   
//////// DELETE Notice   ///////
 const DelNotice = ( )=>{
       axios.delete(`http://localhost:9000/api/v1/e-res/deleteNotice/${noticeId}`).then(
               (response)=>{
                   if(response.data == 400){
                       toast.error(" Error obatined try later ! ",{position:'bottom-center'}) 
                   }
                   else{
                       let data = response.data;
                       setDelete(true)
                       setActionDiv(false)
                       fetchAllNotices() 
                       
                   }
               }).
               catch((error)=>{ 
                 toast.error(" Error obatined try later ! ",{position:'bottom-center'}) 
                   // alert(error);
                    console.log(error)      
               }
            )  
  }

 //////// FETCH  ALL NOTICE   ///////
  const fetchAllNotices =() => {
     // fetching EmployeesData
     setLoader(true);
     axios.get("http://localhost:9000/api/v1/e-res/notices").then(
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
  setNoticeId(userid);
  setActionDiv(true);
  //history.push("/AddEmployee");
 }


 //////// GO TO Add Notice
 const AddNotice = (e)=>{
  e.preventDefault();
  history.push("/AddNotice");
 }

 //////// GO TO EDIT EMPLOYEE
 const EditNotice = ()=>{
  //e.preventDefault();
  history.push(`/EditNotice/${noticeId}`);
 }

 
  

 //////// GO TO VIEW Notice
 const ViewNotice = ()=>{
  history.push(`/ViewNotice/${noticeId}`);
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
<Card style={{marginTop:"50px",border:'.5px solid rgb(11, 5, 102)',backgroundColor:'transparent'}}> 
   <Container >
     <h4 style={{backgroundColor:"rgb(11, 5, 102)",color:'white',paddingLeft:'50px',marginTop:'10px'}}>
     <FaUserEdit  /> Action Container </h4>
      <Row>
      <Col style={{textAlign:'left'}}> 
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
               What to do with Id : {noticeId} ?
            </Card.Text>

                { (access == "Admin-User")?
                   <Row>
                   <Col xm={12} md={4} xm sm={4} lg={4} xl={4}  >
                        <Button  onClick={()=>ViewNotice()}  style={{width:'110px'}} variant="dark">< FaEye/> VIEW</Button>
                   </Col>
                  
                 <Col xm={12} md={4} xm sm={4} lg={4} xl={4}>
                     <Button onClick={()=>EditNotice()}  style={{width:'110px'}} variant="outline-info"> <FaUserEdit/> EDIT</Button>
                </Col>
                <Col xm={12} md={4} xm sm={4} lg={4} xl={4}>
                  { (confirmdel)?
                      <Button style={{width:'110px'}}   onClick={()=>DelNotice() }    variant="outline-danger">< BsFillTrashFill/>DELETE</Button>
                      :<Button style={{width:'110px'}} disabled variant="outline-danger">< BsFillTrashFill/>DELETE</Button>
                   } 
                  </Col> 
                  </Row> 
                 :
                 <Row>
                 <Col xm={12} md={4} xm sm={4} lg={4} xl={4}  >
                      <Button  onClick={()=>ViewNotice()}  style={{width:'110px'}} variant="outline-info">< FaEye/> VIEW</Button>
                 </Col>
                 </Row>
                 }
              
           <hr></hr>  
          
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
         Notice Deleted Sussessfully!
      </Alert></Container>:""}
   <ToastContainer /><br></br><br></br><br></br>
    <div className="main_div_Table">
      <div className="center_div_Table">
         <Card  style={{backgroundColor:'transparent'}} >
         <Card.Header className="Cards"><BsFillPeopleFill />
         </Card.Header>
           
         <Card.Title style={{textAlign:'center',color:'rgb(11, 5, 102)',fontWeight:'bold',marginTop:'-20px'}}>< BiChalkboard/> All Notices</Card.Title>
           <Card.Body style={{marginTop:'-10px'}}>
           {(access == "Admin-User")?<div>
                   <Button onClick={AddNotice} style={{backgroundColor:'rgb(11, 5, 102)',color:'white'}} >< AiFillFolderAdd/> Add Notice </Button> 
            </div>:""}
              <Table striped bordered hover size="sm">
                 <thead style={{backgroundColor:'rgb(11, 5, 102)',color:'white'}}>
                    <tr>
                      <th>S.No</th>
                      <th>Id.No</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th> 
                    </tr>
                 </thead>
                 <tbody>
                 {
                   ListData.map((userdata , index)=>(
                  // alert(userdata.fullname) }
                    <tr style={{ backgroundColor:(userdata.noticeon == cdate)?'#FCD89B ' :""}} className="empLine" onClick={(e)=>{selectLine(userdata.id)}}>
                    <td>{index+1 }</td>
                    <td>{userdata.id}</td>
                    <td>{userdata.noticetitle}</td>
                    <td>{userdata.noticeon}</td>
                    <td>{userdata.noticetime }</td>                    
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
export default Notice;