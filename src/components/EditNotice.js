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
import { useParams, Link , NavLink ,Redirect ,useHistory} from 'react-router-dom'; 
import Menu from './Menu';
import spinner from '../Spinners/VeryfySpinner.gif';


 const EditNotice =(props)=>
{
    let userData , history = useHistory();
    userData =JSON.parse(localStorage.getItem("data"));
    if(!userData)  history.push("/");
    if(!userData[0].accessibility == 'Admin-User') history.push("/")
   
    const {NoticeId} = useParams(); 

    let ctime  = new Date().toLocaleTimeString();
    let cdate  = new Date().toDateString();

    const[Loader ,     setLoader] = useState();
    const[Noticetitle, setNoticeTitle] = useState();
    const[Noticemsg , setNoticeMsg ]   = useState();
    const[ENData , setENData]          = useState([""]);
    const[NoticeData , setNoticeData]  = useState([""]);
    const[invalidId , setInvalidId] = useState()

    const addNoticeTitle = (event)=>{
         setNoticeTitle( event.target.value ) 
    } 

    const addNoticeMsg = (event) =>{
         setNoticeMsg( event.target.value )
    }

     useEffect(() => {
       fetchNoticeById();
     }, [])
        
         
// GET Notice BY ID   
const fetchNoticeById =()=>{
    setLoader(true)
    let data;
          axios.get(`http://localhost:9000/api/v1/e-res/notice/${NoticeId}`).then(
           (response)=>{
              if(response.data == 400){
                   toast.error(" Error occured while fetching notice by id try later ! ",{position:'bottom-center'}) 
               }
               else
               {
                    data = response.data;
                    if(data.success == 404)
                    {
                        setInvalidId(true);
                        setLoader(false);
                     }else
                    {
                      //  setNoticeData(data);
                      
                      setNoticeMsg(data[0].noticemsg)
                      setNoticeTitle(data[0].noticetitle)
                      setLoader(false);
                    }
               }     
           }).
           catch((error)=>{ 
           toast.error(" Error fetching notice by id try later ! ",{position:'bottom-center'})   
         })
}


    const handleSubmit =(e)=>{

            e.preventDefault();
            const noticeObj ={
            noticetitle  : Noticetitle,
            noticemsg    : Noticemsg,
             }          
                 
            if( Noticetitle && Noticemsg)   {
                    axios.put(  `http://localhost:9000/api/v1/e-res/updateNotice/${NoticeId}`,noticeObj).then(
                        (response)=>{
                            alert("Notice updated successfully !")
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
       
{/* Displaying Spinners Andrew And */}

 {Loader?
 <div className="Spinner"> 
    <img src={spinner} />Please wait.. <br></br>  
 </div>
: <div>
 {(invalidId )?<p style={{textAlign:'center',paddingTop:'250px'}}>NOTICE NOT FOUND WITH ID : {NoticeId}</p>
 :   
       <Jumbotron style={{backgroundColor:'white'}}>
      
       <div className="main_div_addE">
          <div className="center_div_addE">
         <h4 >EDIT NOTICE</h4>
            <Form onSubmit = { handleSubmit }>
             <Container>
                 <Card><hr></hr>
                 <Row>
                       <Col lg={12} xs={12} sm={12} md={12}>
                            <label>Title</label>
                            <input
                            Value={Noticetitle}
                            onChange={addNoticeTitle} style={{paddingLeft:'50px'}}
                            className="inpt11" style={{height:'40px',border:'1px solid rgb(39, 129, 133)'}} ></input>
                        </Col>
                </Row><hr></hr>
                <Row>
                       <Col lg={12} xs={12} sm={12} md={12}>
                            <label>Content</label>
                            <input
                            type="text"
                            Value={Noticemsg}
                            onChange={addNoticeMsg} style={{paddingLeft:'50px'}}
                            className="inpt11" style={{height:'100px',border:'1px solid rgb(39, 129, 133)'}} ></input>
                        </Col>
                </Row><hr></hr>
                <Button type="submit" variant="outline-info" > SAVE EDIT  NOTICE</Button>
                </Card>
             </Container>
              
           </Form>
          < ToastContainer >  </ToastContainer>
          </div>
       </div>
     
       </Jumbotron>
    }
    </div>
  }
  
    </>
);
}
export default EditNotice;

