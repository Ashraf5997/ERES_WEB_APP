
import React ,{useState , useEffect} from 'react';
import './ToDo.css';
import  Jumbotron from 'react-bootstrap/Jumbotron';
import  Button  from 'react-bootstrap/Button';
import  Container from 'react-bootstrap/Container';
import  Row from 'react-bootstrap/Row';
import  Col from 'react-bootstrap/Col';
import { FcAddDatabase} from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import { BsGraphDown} from "react-icons/bs";
import { FcList} from "react-icons/fc";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FcDeleteRow} from "react-icons/fc";
import {FcAlarmClock} from "react-icons/fc";
import { BiCalendarCheck } from 'react-icons/bi';
import { BiSelectMultiple } from 'react-icons/bi';
import axios from "axios";
import  Card from 'react-bootstrap/Card';
import { useParams,Link , NavLink ,Redirect , useHistory} from 'react-router-dom'; 
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Table from 'react-bootstrap/Table';
import spinner from '../Spinners/VeryfySpinner.gif';
import Menu from './Menu';

    const  Todo = (props)=>{
    const {EmpId} = useParams(); 
    
    let i2 = 1,i1 =1, username, userData , access , CRUDurl,history= useHistory(); 
    userData =JSON.parse(localStorage.getItem("data"));

    if(!userData) history.push("/") ;
   
    if(userData) access = userData[0].accessibility;
    
    let cmonth = new Date().getMonth()+1; 
    let cday   = new Date().getDay(); 
    let ctime  = new Date().toLocaleTimeString();
    let cdate  = new Date().toDateString();

    const [currentTime,updateCTime] = useState();

    const updateTime = ()=>{
       let time = new Date().toLocaleTimeString();
        updateCTime(time); 
    } 
    setInterval(updateTime , 1000 );
    
    const months =[" ","January" ,"February" , " March" ,"April" , "May" ,"June" ,"July","August","September",
    "October","November" ,"December"] 
    const [date , setDate] = useState();
    const [showPT , setShowPT]= useState(false)
    const [TDay, setTDay] = useState([""])
    const [totaltask , setTotaltask]= useState([]);
    const [ddays , setDdays] = useState([" "]);
    const [inputItems , setInputItem ]  =  useState("");
    const [updateId , setUpdateId] = useState("");
    const [status , setStatus] = useState("");
    const addEvent = (event)=>{ setInputItem(event.target.value )  } 
    const [items , setItems] = useState([]);
    const [pendingTask , setPendingTask] = useState([]);
    let janC=0, febC=0 ,marC=0, aprC=0,mayC=0,junC=0,julC=0,augC=0,sepC=0,octC=0,novC=0,decC=0;
    const [isLoading, setLoading] = useState(true);    
    const [month , setMonth]  = useState(cmonth);

    const [Djan , setDjan] = useState();
    const [Dfeb , setDfeb] = useState();
    const [Dmar , setDmar] = useState();
    const [Dapr , setDapr] = useState();
    const [Dmay , setDmay] = useState();
    const [Djun , setDjun] = useState();
    const [Djul , setDjul] = useState();
    const [Daug , setDaug] = useState();
    const [Dsep , setDsep] = useState();
    const [Doct , setDoct] = useState();
    const [Dnov , setDnov] = useState();
    const [Ddec , setDdec] = useState();
    const [confirmdel , setConfirmdel]= useState(false);
     
    
     // EDIT TASK BY ID 
     const editTaskById =(id, task , status, date)=>{
        setInputItem(task);setUpdateId(id);setStatus(status); setDate(date);
     }

    // DELTE TASK BY TASK  ID
    const deltTaskById =(id,edate)=>{
       axios.delete(`http://localhost:9000/api/v1/e-res/deleteTask/${id}`).then(
            (response)=>{
                if(response.data == 400){
                    toast.error(" Error obatined try later ! ",{position:'bottom-center'}) 
                }
                else{
                    getPendingTask();
                    findDays();
                     let data = response.data;
                     toast.success(" Task deleted successfully ! ",{position:'top-left'}) 
                    if(showPT){
                        showPendingTask();
                        
                    }else{
                      getTaskByDay(edate)
                      getDuplicateById(cmonth)
                    } 
                }
            }).
                 catch((error)=>{ 
                 toast.error(" Error obatined try later ! ",{position:'bottom-center'}) 
                 console.log(error)      
            }
         )  
    }


        // DONE TASK BY ID
         const doneTaskById =( date ,id , status,task)=>{
         if( status == 1){status = 0} else {status =1;}
           let TodoData = {
              status  :  status,
              task    :  task
         }
        
         axios.put(`http://localhost:9000/api/v1/e-res/updateTask/${id}`,TodoData).then(
            (response)=>{
                if(response.data == 400){
                    toast.error(" Invalid data from update task try later ! ",{position:'bottom-center'}) 
                }
                else{
                    let data = response.data;
                       getPendingTask();
                     toast.success(" Status updated  successfully ! ",{position:'top-left'}) 
                     if(showPT){
                       setTDay(pendingTask)
                      showPendingTask();
                     }else{
                    getTaskByDay(date) 
                     }
                }
            }).
                catch((error)=>{ 
                alert(error);
                console.log(error)
           })          
    }
 
  const stopLoading =()=>{
        setLoading(false)
    }
        useEffect(() => {
          setInterval(stopLoading , 500 );
          getPendingTask();
          getDuplicateById(cmonth);
          getTaskByDay(cdate);
          findDays();
          // getDuplicateById=(cm)
       
     }, [])

/// confirm del
const confrimDel = ()=>{
   (confirmdel)?setConfirmdel(false):setConfirmdel(true);
}
  
// GET ALL PENDING TASK BY ID   
const getPendingTask =()=>{
             axios.get(`http://localhost:9000/api/v1/e-res/getPendingTask/${EmpId}`).then(
                    (response)=>{
                        if(response.data == 400){
                            toast.error(" Error occured try later ! ",{position:'bottom-center'}) 
                        }
                        else{
                          let data = response.data;
                          if(data.success == 404){
                            setPendingTask(false);
                          }else{
                            setPendingTask(data); 
                          }
                        }     
                    })
}  
/// SHOW PT
const showPendingTask=()=>{
    setTDay(pendingTask)
    setShowPT(true)
}

const addItems = ()=>{
        if(inputItems == ""){
           toast.warning("Please add your task",{position:'top-center'})
        }
        else
        {  
           let TodoData =
           {
                userid    : EmpId,//userData[0].id,
                task      : inputItems,
                day       : cday,
                month     : cmonth,
                year      : '2021',
                edate     : cdate,
                etime     : ctime,
                status    : '0'
           }
           if(updateId){
                let TodoData = {
                    status  :  status,
                    task    :  inputItems,
                }
                axios.put(`http://localhost:9000/api/v1/e-res/updateTask/${updateId}`,TodoData).then(
                    (response)=>{
                        if(response.data == 400){
                            toast.error(" Invalid data from update task try later ! ",{position:'bottom-center'}) 
                        }
                        else{

                            let data = response.data;
                            getPendingTask();
                            toast.success(" Task description updated  successfully ! ",{position:'top-right'})  
                            setUpdateId("")
                            getDuplicateById(cmonth)
                            getTaskByDay(date)
                        }
                    }).
                        catch((error)=>{ 
                        alert(error);
                        console.log(error)
                    })              
           }else{
                axios.post("http://localhost:9000/api/v1/e-res/createTask",TodoData).then(
                (response)=>{
                    if(response.data == 400){
                        toast.error(" Invalid data try later ! ",{position:'bottom-center'}) 
                    }
                    else{
                        let data = response.data
                         findDays();
                         getTaskByDay(cdate)
                         getPendingTask()
                         getDuplicateById(cmonth)

                        toast.success(" Task added successfully ! ",{position:'top-right'})  
                    }
                }).
                    catch((error)=>{ 
                    alert(error);
                    console.log(error)
                }) 
            }         
        }
               setInputItem(""); 
    }      
      
  // MONTHS
  const monthnumber =(num)=>{
    setMonth(num);
    getDuplicateById(num)
  }
// FETCHING WORKING DATES IN GIVEN MONTH
const getDuplicateById=(cm)=>{
    let Dataobj =
    {
        userid    : EmpId,//userData[0].id,
        month     : cm,
    }
    axios.post("http://localhost:9000/api/v1/e-res/getDuplicateDayById",Dataobj).then(
        (response)=>{
            if(response.data == 400){
                toast.error(" Invalid data try later ! ",{position:'bottom-center'}) 
            }
            else{
                let data = response.data;
                if(data.status == 404)alert("SORRY NO RECORDS FOUND ")
                else{ 
                   setDdays(data);    
                }
             
            }
            }).
                    catch((error)=>{ 
                    alert(error);
                    console.log(error)
            })         
    }
// FETCHING ALL TASK IN GIVEN DAY
    const getTaskByDay=(cdate)=>{
    let Dataobj =
    {
        userid    : EmpId,//userData[0].id,
        edate     : cdate
    }

    axios.post("http://localhost:9000/api/v1/e-res/getTaskByDay",Dataobj).then(
        (response)=>{
            if(response.data == 400){
                toast.error(" Invalid data try later ! ",{position:'bottom-center'}) 
            }
            else{
                let data = response.data;
                setTDay(data);
                setShowPT(false);    
            }
            }).
                    catch((error)=>{ 
                    alert(error);
                    console.log(error)
            })          
    }
   
 // FETCHING ALL TASK   IN  EACH  MONTHS
 const findDays = ()=>{
 axios.get("http://localhost:9000/api/v1/e-res/taskById/"+EmpId).then(
      (response)=>{
     // jan
         let  tdays = response.data;
        if(tdays.success != 404){
        setTotaltask(tdays)
     // setTotaltask(response.data);
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
      }
         
      })         
}

   return(
   <>
<Menu />
{
    // LOADING PAGE 
    (isLoading)?
    <div className="Spinner"> 
        <img src={spinner} />Please wait...<br></br>
    </div>
    :
<Jumbotron style={{backgroundColor:'transparent'}}>
   <Row>
      <Col xs={5} sm={4} md={3} lg={2}  style={{background:'blacsk'}}>
          <p style={{float:'left',paddingLeft:'60px'}}> <FcAlarmClock style={{fontSize:'25px'}}/>  {currentTime}</p> 
      </Col>
   </Row> 

   {(userData[0].id == EmpId)?
  <Container>
        <input className="input1" type="text " placeholder=" what are you going to do today ,,,, type here.... " value={inputItems} onChange={addEvent} />   
        <Button className="buttonAdd" onClick={addItems}><FcAddDatabase style={{fontSize:'25px'}} /></Button>   
  </Container>:""}

  <hr></hr>
  <Row>
    <Col xm={12} sm={12} md={6}lg={6}  >
    <p className="TDL">What you have done so far </p><hr></hr> 
    <Row style={{marginLeft:'1px'}}>
        <Col lg={6}> <p><BsGraphUp style={{backgroundColor:'orange'}} />      TOTAL TASK ADDED YET : {totaltask.length}</p></Col>
        <Col lg={6} >
        {(pendingTask)?
   <button onClick={(e)=>showPendingTask()}
    style={{backgroundColor:'orange',color:'white'}}><BsGraphDown  style={{backgroundColor:'red'}} />  PLEASE FINISH PENDING TASK : {pendingTask.length}
   </button>:""
        }
         </Col>

    </Row>
    <Row>
        <Col col xm={3}sm={3} md={3} lg={3}>
          <ol><li onClick={()=>monthnumber(1)}> January [ {Djan} ] </li>  </ol> 
        </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
           <ol><li onClick={()=>monthnumber(2)}> February [ {Dfeb} ] </li>  </ol>
         </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
            <ol><li onClick={()=>monthnumber(3)}>March [ {Dmar} ]</li></ol> 
         </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
            <ol><li  onClick={()=>monthnumber(4)}>Aprail [ {Dapr} ]</li></ol> 
         </Col>
    </Row>
    <Row>
         <Col col xm={3}sm={3} md={3} lg={3}>
            <ol><li onClick={()=>monthnumber(5)} >May [ {Dmay} ] </li></ol>
         </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
           <ol><li onClick={()=>monthnumber(6)}>June [ {Djun} ]</li></ol>
         </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
            <ol><li onClick={()=>monthnumber(7)}>July [ {Djul} ]</li></ol>
         </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
            <ol><li onClick={()=>monthnumber(8)}>March [ {Daug} ]</li></ol>
         </Col>
    </Row>
    <Row>
         <Col col xm={3}sm={3} md={3} lg={3}>
           <ol> <li onClick={()=>monthnumber(9)} >September [ {Dsep} ]  </li></ol>
         </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
            <ol><li onClick={()=>monthnumber(10)}>October [ {Doct} ]</li></ol> 
         </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
            <ol><li conClick={()=>monthnumber(11)}>November [ {Dnov} ]</li> </ol>
         </Col>
         <Col col xm={3}sm={3} md={3} lg={3}>
            <ol><li onClick={()=>monthnumber(12)}>December [ {Ddec} ]</li></ol>
         </Col>
    </Row>
 </Col>
 
 <Col xm={12}sm={12}md={6}lg={6}>
     <Row>
         <Col>
         </Col>
     </Row> 
     <p className="TDL" style={{paddingLeft:'-5px' , fontSize:'15px'}}><BiCalendarCheck />  Month: {months[month]}</p>

     <Table striped bordered hover size="sm" style={{fontSize:"12px"}}  >
                 <thead style={{backgroundColor:'rgb(11, 5, 102)',color:'white'}}>
                    <tr>
                        <th>S.No</th>
                        <th>Date </th>
                        <th>Action</th>
                    </tr>
                 </thead>
                 <tbody>
                  { ddays.map((dates , index)=>(
                    <tr>
                    <td>{i1++ }</td>
                    <td>{dates.edate}</td>
                     <Button onClick={(e)=>{getTaskByDay(dates.edate)}}  style={{fontSize:'12px'}} variant ="outline-dark" >Check all task</Button>        
                   </tr>
                   ))}  
                 </tbody>
    </Table> 
 </Col>
</Row>
<hr></hr>

<Table striped bordered hover size="sm" style={{fontSize:"12px"}}  >
                 <thead style={{backgroundColor:'rgb(11, 5, 102)',color:'white'}}>
                    <tr>
                        <th>S.No</th>
                        <th>Task Id.No</th>
                        <th>Task Descriptions </th>
                        <th>Entry Time</th>
                        <th>Entry Date</th>
                        <th>Status</th>
                        {(userData[0].id == EmpId)? 
                        <th>Action || Delete  <input type ="checkbox" onClick={confrimDel} style={{fontSize:'500px'}} /></th>
                        :""}
                   </tr>
                  </thead>
                  <tbody>
                  {(TDay)?
                  TDay.map((dates , index)=>(
                    <tr>
                    <td>{i2++ }</td>
                    <td>{dates.id}</td>
                    <td style={{color:"orange"}}>{dates.task}</td>
                    <td>{dates.etime}</td>
                    <td>{dates.edate}</td>
                    {
                        (dates.status == 1)?<td style={{backgroundColor:'#C0FAB6',color:"green"}}>Done</td>:<td style={{color:"orange"}} >Pending</td>
                    }
                    {(userData[0].id == EmpId)?
                    <div>
                    <OverlayTrigger overlay={<Tooltip>EDIT DATA</Tooltip>}>
                     <span className="d-inline-block">
                        <Button onClick={(e)=>editTaskById( dates.id , dates.task, dates.status, dates.edates  )} style={{fontSize:'12px'}} variant="outline-info">
                           <FiEdit2/>
                        </Button>
                    </span>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip> TASK DONE ?</Tooltip>}>
                     <span className="d-inline-block">
                        <Button  onClick={(e)=>doneTaskById(dates.edate ,dates.id ,dates.status,dates.task)} style={{fontSize:'12px'}} variant="outline-info">
                           <FiCheck/>
                        </Button>
                    </span>
                    </OverlayTrigger>
                        {(confirmdel)?
                         <OverlayTrigger overlay={<Tooltip>DELETE DATA</Tooltip>}>
                         <span className="d-inline-block">
                            <Button  onClick={(e)=>deltTaskById(dates.id , dates.edate)} style={{fontSize:'12px'}} variant="outline-danger">
                               <BsFillTrashFill />
                            </Button>
                        </span>
                        </OverlayTrigger>  
                        :
                        <Button style={{fontSize:'12px'}}   disabled variant ="outline-danger" >< BsFillTrashFill /></Button> 
                       } 
                       </div>
                       :""}

                   </tr>
                   )):""
                }  
                 </tbody>
    </Table>
  
</Jumbotron>  
}          

   </>
   );}                   

export default Todo

