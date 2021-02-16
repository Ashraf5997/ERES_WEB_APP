
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
import  axios from "axios";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BsFillTrashFill} from 'react-icons/bs';
import { BsPersonBoundingBox} from 'react-icons/bs';
import { BsPersonPlusFill} from 'react-icons/bs';
import { BsPencilSquare} from 'react-icons/bs';
import { AiFillFolderAdd} from 'react-icons/ai';
import { AiFillMedicineBox} from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { FaEye} from "react-icons/fa";
import spinner from '../Spinners/VeryfySpinner.gif';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert'
import { FiX} from "react-icons/fi";
import Menu from './Menu';
import { useParams ,Link , NavLink ,Redirect , useHistory} from 'react-router-dom'; 
  const Axios = require('axios').default;

  const Notice=(props)=>{
  const {NoticeId} = useParams(); 
 
  let userData ,access,  history = useHistory();
  userData=JSON.parse(localStorage.getItem("data"));
  
  if(!userData) history.push("/") 
  if(userData) access = userData[0].accessibility;
  const[Loader ,     setLoader] = useState();
  const[invalidId , setInvalidId] = useState()
  const[noticeData , setNoticeData] = useState(['']);

  useEffect(() => {
  fetchNoticeById()

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
                        setNoticeData(data);
                        setLoader(false);
                    }
               }     
           }).
           catch((error)=>{ 
           toast.error(" Error fetching notice by id try later ! ",{position:'bottom-center'})   
         })
}
    return(
     <>  
       <Menu/>    
{/* Displaying Spinners Andrew And */}

 {Loader?
 <div className="Spinner"> 
    <img src={spinner} />Please wait.. <br></br>  
 </div>
: <div>
 {(invalidId )?<p style={{textAlign:'center',paddingTop:'250px'}}>NOTICE NOT FOUND WITH ID : {NoticeId}</p>
 :   
<Jumbotron style={{backgroundColor:'transparent'}}>
<Container>
<div className="mains_div_Table" >  
 <div className="centesr_div_Table">    
  <Card style={{border:'.5 px solid grey' }}> 

     <br></br>
     <p style={{paddingLeft:'-552px'}}>{noticeData[0].noticeon} </p>
     <h4 style={{textAlign:'center',fontWeight:'bold',textDecoration:'underline'}}>NOTICE</h4><br></br>
     <h4 style={{textAlign:'center'}}>{noticeData[0].noticetitle}</h4><br></br><br></br>
 <p style={{paddingLeft:'50px',paddingRight:'50px',textAlign:'center',color:'orange'}}>{noticeData[0].noticemsg}</p>
  
 <br></br>
     <h6 style={{paddingLeft:'6px'}}>Notice By</h6>
    <p style={{paddingLeft:'60px'}}>{noticeData[0].noticeby}</p>
    <br></br><br></br>
</Card>
</div>
</div>
</Container>
</Jumbotron>
  }
</div>
}                    
     </>

    );

}
export default Notice;