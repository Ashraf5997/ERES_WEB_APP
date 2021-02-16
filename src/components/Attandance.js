
import React ,{useState , useEffect} from 'react';
import './LandingPage.css';
import '../App.css';
import './Attendance.css';
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
import { FcComboChart } from "react-icons/fc";
import axios from "axios";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCalendarFill } from 'react-icons/bs';
import { BsPen } from 'react-icons/bs';
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
import { BiFontFamily } from 'react-icons/bi';


    const Axios = require('axios').default;
    const Attandance=(props)=>{

    const months =[" ","January" ,"February" , " March" ,"April" , "May" ,"June" ,"July","August","September",
    "October","November" ,"December"] 

    const {EmpId} = useParams(); 
  
    const [noEntry , setNoEntry]= useState(0);
    let i=1,  userData , history= useHistory(); 
    let janC=0, febC=0 ,marC=0, aprC=0,mayC=0,junC=0,julC=0,augC=0,sepC=0,octC=0,novC=0,decC=0;
    let cmonth = new Date().getMonth()+1; 
    let cday = new Date().getDay(); 

    const [ confirmdel , setConfirmdel]= useState(false);
    const [ invalidId,setInvalidId]=useState();
    const [ Loader,setLoader]=useState(true);
    const [ attendance , setAttendance] =useState([]);
    const [ duplicate , setDuplicate] =useState([]);
    const [ month , setMonth] = useState(cmonth);
    const [ count , setcount] = useState();
    const [ Djan , setDjan] = useState();
    const [ Dfeb , setDfeb] = useState();
    const [ Dmar , setDmar] = useState();
    const [ Dapr , setDapr] = useState();
    const [ Dmay , setDmay] = useState();
    const [ Djun , setDjun] = useState();
    const [ Djul , setDjul] = useState();
    const [ Daug , setDaug] = useState();
    const [ Dsep , setDsep] = useState();
    const [ Doct , setDoct] = useState();
    const [ Dnov , setDnov] = useState();
    const [ Ddec , setDdec] = useState();
    
    userData=JSON.parse(localStorage.getItem("data"));
    
    if(!userData) history.push("/") 
    const stopLoading = ()=>{
        setLoader(false);
        
    }
       useEffect(() => {
        setInterval(stopLoading , 500 ); 
        fetchAttendanceDetail();

       }, [])

       
//////// FETCH  ATTENDANCE   ///////
const fetchAttendanceDetail =() => {
  axios.get("http://localhost:9000/api/v1/e-res/attendanceById/"+EmpId).then(
                (response)=>{
                    if(response.data == 400){
                        toast.error(" Error occured try later 404  ! ",{position:'bottom-center'}) 
                    }
                    else{
                          let data = response.data ;
                          if(data.success  == 404)
                          {
                           setInvalidId(true)
                          }else{
                            setAttendance(data); 
                            findDays();
                            updateEntry();
                          }
                    }
                    }).
                     catch((error)=>{ 
                     toast.error(" Error occured try later  ! ",{position:'bottom-center'}) 
                     console.log(error)
                    }
                   )  
 }
       
 // FETCH DATA
const updateEntry =()=>{
  let dataObj =
  {
      userid    : EmpId,
      edate     : new Date().toDateString()
  }
  axios.post("http://localhost:9000/api/v1/e-res/dateToday",dataObj).then(
    (response)=>{
        let data = response.data ;
        if(data.status == 404){
          if(userData[0].id == EmpId)
          {
            setNoEntry(true)
          }else{
            setNoEntry(false)   
          }
        }else{
            setNoEntry(false)   
        }  
     })   
}

/*  const dailyEntry = ()=>{
    let time = new Date().toLocaleTimeString();
    let fixedTime = "11:46:00AM";
    let tH = new Date().getHours();
    let tM= new Date().getMinutes();
    let tS = new Date().getSeconds();
    if( (tH == 12 && tM == 17) && (tS == 59)){
       setNoEntry(true)
    }
} */

/// confirm del
const confrimDel = ()=>{
  (confirmdel)?setConfirmdel(false):setConfirmdel(true);
}

//////// DELETE ATTENDANCE
  const delDate= (id)=>{  
    axios.delete("http://localhost:9000/api/v1/e-res/deleteAttendanceById/"+id).then(
        (response)=>{
            if(response.data == 400){
                toast.error(" Error occured try later  ! ",{position:'bottom-center'}) 
            }
            else{
                  fetchAttendanceDetail();
                  findDays();
                  toast.success(" Deleted Successfully  ! ",{position:'bottom-center'}) 
                }
          }).
             catch((error)=>{ 
             alert(error);
             console.log(error)  
          }
         )  
   }


// NOT IN OFFICE
 const notInOffice= ()=>{
     setNoEntry(false);
 }

/// YES IN OFFICE
  const yesInOffice = ()=>{
     let AttendanceData =
     {
         userid    : EmpId,
         username  : userData[0].fullname,
         day       : cday,
         month     : cmonth,
         year      : '2021',
         edate     : new Date().toDateString(),
         etime     :new Date().toLocaleTimeString()
     }
      axios.post("http://localhost:9000/api/v1/e-res/createAttendance",AttendanceData).then(
        (response)=>{
            if(response.data == 400){
                toast.error(" Invalid data try later ! ",{position:'bottom-center'}) 
            }
            else{
                let data = response.data
                fetchAttendanceDetail() 
                findDays()    
                setNoEntry(false)
              toast.success(" Attendance done successfully ! ",{position:'bottom-center'})   
            }
        }).
             catch((error)=>{ 
               alert(error);
             console.log(error)
        })          
 }   
  // MONTHS
  const monthnumber =(num)=>{
    setMonth(num);
  }

 // FINDING DAYS IN  MONTHS 
  const findDays = ()=>{
  axios.get("http://localhost:9000/api/v1/e-res/attendanceById/"+EmpId).then(
    (response)=>{
      // jan
          let  tdays = response.data;
          tdays.map((data1 , index)=>(
           (data1.month ==1)?janC++:"" ))
           setDjan(janC)
      // feb
           tdays.map((data2 , index)=>(
           (data2.month ==2)?febC++:"" ))
           setDfeb(febC)
      // mar
           tdays.map((data2 , index)=>(
           (data2.month ==3)?marC++:"" ))
           setDmar(marC)
      // apr
           tdays.map((data2 , index)=>(
           (data2.month ==4)?aprC++:"" ))
           setDapr(aprC)
      // may
           tdays.map((data2 , index)=>(
           (data2.month ==5)?mayC++:"" ))
           setDmay(mayC)
      // jun
           tdays.map((data2 , index)=>(
           (data2.month ==6)?junC++:"" ))
           setDjun(junC)
      // jul
           tdays.map((data2 , index)=>(
           (data2.month ==7)?julC++:"" ))
           setDjul(julC)
      // aug
           tdays.map((data2 , index)=>(
           (data2.month ==8)?augC++:"" ))
           setDaug(augC)
      // sep
           tdays.map((data2 , index)=>(
           (data2.month ==9)?sepC++:"" ))
           setDsep(sepC)
      // oct
           tdays.map((data2 , index)=>(
           (data2.month ==10)?octC++:"" ))
           setDoct(octC)
      // noc
           tdays.map((data2 , index)=>(
           (data2.month ==11)?novC++:"" ))
           setDnov(novC)
      // dec
           tdays.map((data2 , index)=>(
           (data2.month ==12)?decC++:"" ))
           setDdec(decC)
        })             
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
  // veryfying valid userid
  (invalidId)?<div>
      <Jumbotron style={{backgroundColor:'white',textAlign:'center',fontFamily:'courier'}}>
        <p1 style={{textAlign:'center',paddingTop:'250px'}}>ATTENDANCE NOT FOUND WITH ID : {EmpId}</p1>
      </Jumbotron>
  </div>
 :<div>
 
{
  // VERYING  attendance
(noEntry)?
<Jumbotron>
<div className="main_div_Table" >       
<Card style={{marginTop:"50px",border:'.5px solid rgb(39, 129, 133)'}}> 
   <Container>
     <h4 style={{backgroundColor:"rgb(39, 129, 133)",color:'white',paddingLeft:'50px',marginTop:'10px'}}>
     <BsPen  /> Attendance Sheet Entry
     </h4>
  </Container>
    <Container>
        <Card style={{textAlign:'center',marginTop:'0px'}}>
        <Card.Body>
            <Card.Title style={{color:'orange'}}>Hi.. {userData[0].fullname}</Card.Title>
            <Card.Text>
            Are you in Office Today ?
            </Card.Text>
            <Row>
                 <Col xm={12} md={6} xm sm={6} lg={6} xl={6}  >
                     <Button  onClick={yesInOffice} style={{width:'220px'}} variant="outline-info">Yes</Button>
                </Col>
                 <Col xm={12} md={6} xm sm={6} lg={6} xl={6}>
                      <Button onClick={notInOffice} style={{width:'220px'}} variant="outline-info">No</Button>
                </Col>
            </Row>  
        </Card.Body>
     </Card>
     </Container>
  </Card>
</div>
  </Jumbotron>
  :
<Jumbotron style={{backgroundColor:"transparent" , marginTop:'0px'}}>
<Container>
  <Card style={{backgroundColor:'transparent',border:'none'}}>
  <Card.Header className="Cards"><BsCalendarFill /></Card.Header><br></br>
  <Row>
     <Col xm={12} sm={6} md={4} lg={3} > 
      <ol>
          <li href="#" onClick={()=>monthnumber(1)}>  January [ {Djan}]  </li>
          <li href="#" onClick={()=>monthnumber(2)}>  February [{Dfeb}]  </li> 
          <li href="#" onClick={()=>monthnumber(3)}>  march [{Dmar}]     </li>
          <li href="#" onClick={()=>monthnumber(4)}>  April [{Dapr}]     </li> 
          <li href="#" onClick={()=>monthnumber(5)}>  May [{Dmay}]       </li>
          <li href="#" onClick={()=>monthnumber(6)}>  June [{Djun}]      </li> 
          <li href="#" onClick={()=>monthnumber(7)}>  July [{Djul}]      </li>
          <li href="#" onClick={()=>monthnumber(8)}>  August [{Daug}]    </li>
          <li href="#" onClick={()=>monthnumber(9)}>  September [{Dsep}] </li>
          <li href="#" onClick={()=>monthnumber(10)}> October [{Doct}]   </li>
          <li href="#" onClick={()=>monthnumber(11)}> November [{Dnov}]  </li>
          <li href="#" onClick={()=>monthnumber(12)}> December [{Ddec}]  </li>
      </ol>
   </Col>

     <Col>
      <Row style={{fontSize:'20px',marginLeft:'4px' ,color:'orange'}}>
        <Col> Month : {months[month]}</Col>
        <Col>Total Working Days : {attendance.length}</Col>
      </Row>
        <Container>
               <Table striped bordered hover size="sm" style={{fontSize:"12px"}}  >
                 <thead style={{backgroundColor:'rgb(11, 5, 102)',color:'white'}}>
                    <tr>
                      <th>S.No</th>
                        <th>Working Days</th>
                        <th>Entry Time</th>
                         {(userData[0].id == EmpId)?
                        <th>Delete  <input type ="checkbox" onClick={confrimDel} style={{fontSize:'500px'}} /></th>
                        :""}
                    </tr>
                 </thead>
                 <tbody>
                 { 
                   attendance.map((dates , index)=>(
                     (dates.month == month)?

                    <tr>
                    <td>{i++ }</td>
                    <td>{dates.edate}</td>
                    <td>{dates.etime}</td>

                    {(userData[0].id == EmpId)?<div>
                       {(confirmdel)?
                         <Button  style={{fontSize:'12px'}}  onClick={()=>delDate(dates.id)} variant ="outline-danger" >< BsFillTrashFill /></Button> 
                        :
                        <Button style={{fontSize:'12px'}}   disabled variant ="outline-danger" >< BsFillTrashFill /></Button> 
                       }
                        </div>:""}

                   </tr>
                   :""
                   ))
                 } 
                   </tbody>
                </Table>
            </Container> 
     </Col>
  </Row>
  </Card>
</Container>
</Jumbotron>
  }
</div>}

</div>}

     </>

    );

}
export default Attandance;