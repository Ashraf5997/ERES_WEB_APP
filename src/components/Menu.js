import React ,{useState , useEffect }from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './Menu.css';
import { Link , NavLink ,Redirect ,useHistory} from 'react-router-dom'; 
import { FcLock } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import {BsPersonBoundingBox} from 'react-icons/bs';
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const Menu =(props)=>{
   let username,  userData , access , CRUDurl,history= useHistory();
     userData =JSON.parse(localStorage.getItem("data"));

    if(!userData)  history.push("/"); 
    if(userData) access = userData[0].accessibility;
   
   const [show, setShow] = useState(false);
   const [searchData,setsearchData] = useState("");
        const signOut=(e)=>{
        e.preventDefault();
        localStorage.setItem("data",null);
        history.push("/")
        }
        
        const search = (e)=>{
          e.preventDefault();
         if(searchData){
          window.location=`/ViewEmployee/${searchData}`;
          //history.push(`/ViewEmployee/${searchData}`)

        }else{
          toast.warning("Insert employee id",{position:'top-center'})   ;  
         }
        }

        const handleChanges =(e)=>{
          const value = e.target.value;
          setsearchData(value )  ;
        }  
        
        const ATTENDANCE = (e)=>{
        e.preventDefault();
        window.location=`/Attendance/${userData[0].id}`;

        //  history.push(`/Attendance/${userData[0].id}`)
         }

       const TODO = (e)=>{
        e.preventDefault();
        window.location=`/ToDo/${userData[0].id}`;
       // history.push(`/Todo/${userData[0].id}`)
       }

  return(
    <>
      <Navbar className="Navbar_body" variant="dark" >
        <Navbar.Brand>  <img src="/officeImages/officeLogo.png" className="logo1" /></Navbar.Brand>
            <Nav className="mr-auto">
            <NavLink className="navLink"  to="/LandingPage">Index</NavLink>
            <NavLink onClick={ATTENDANCE} className="navLink"  to="#">Attendance</NavLink>
            <NavLink className="navLink"  to="/EmployeeList">Employees</NavLink>
            <NavLink onClick={TODO} className="navLink"  to="#">To Do </NavLink>
            <NavLink className="navLink"  to="/MyProfile">Profile</NavLink>
            <NavLink  className="navLink" to ="/Notice" >Notice
                 <div style={{backgroundColor:'red', width:'30px',height:'20px',color:'white',borderRadius:'90px'}}>1</div>
            </NavLink>
            </Nav>
            <ToastContainer/>
            {(userData)?<p style={{marginRight:'70px',color:'white'}}><BsPersonBoundingBox />  welcome : {userData[0].fullname}</p>:""}
            
            <Form inline>
            <Button  onClick={search} variant="light">< FcSearch style={{ }}/></Button>
            <FormControl type="text" onChange={handleChanges}  placeholder="Search by userid" className="mr-sm-2" />
            <Button variant="light" onClick={signOut} >< FcLock style={{}} /></Button>
            </Form>
       </Navbar>
      </>
  );
}
export default Menu