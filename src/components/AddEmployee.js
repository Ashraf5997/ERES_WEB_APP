import React from 'react'
import Form  from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import {useState , useEffect} from 'react'; 
import  Jumbotron from 'react-bootstrap/Jumbotron';
import './AddEmployee.css';
import  Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FcAddDatabase} from "react-icons/fc";
import { FcList } from "react-icons/fc";
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FcCheckmark} from "react-icons/fc";
import axios from "axios";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link , NavLink ,Redirect ,useHistory} from 'react-router-dom'; 
import Menu from './Menu';

 const AddEmployee =(props)=>
{
    let userData , history = useHistory();
    userData =JSON.parse(localStorage.getItem("data"));
    if(!userData)  history.push("/");
    if(!userData[0].accessibility == 'Admin-User') history.push("/")
    
    const code ='ERES-'+Math.floor( Math.random()*100000);
    
    const [ Values,  setValues] = useState({
        fullname  : '',
        email     : '',
        contact   : '',
        address   : 'West Bengal',
        age       : '',
 qualification    : 'B.Tech',
  designation     : 'Frontend Deveoper',
  Id_no           : '',
  accessibility   : 'Non-Admin-User',
  createdby       :userData[0].fullname,
  updatedby       :'',
  deleted         :'0',
  deletedby       :'',
  password        :code
    })

    const [errors , setErrors] = useState({
        fullname     : " ",
        email        : " ",
        contact      : " ",
        address      : " ",
        age          : " ",
  qualification      : " ",
  designation        : " ",
  Id_no              : " ",
  accessibility      : " "
    }) 

     const handleChanges =(e)=>{
     const{name,value} = e.target;
    
       if(name =='fullname' && ! /^[A-Za-z .]{3,30}$/i.test(value)){
        setErrors({
            ...errors ,
            [name]:"enter valid fullname",
        }) 
        setValues({
            ...Values,
            [name]:""
       })  
      }else{
      
        setErrors({
            ...errors ,
            [name]:" "
        }) 
        setValues({
            ...Values,
            [name]:value
       })  
      }
   
      // EMAIL CHECKING...
      if( name == 'email'){
            if( ! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ){
                setErrors({
                    ...errors ,
                    [name]:"enter valid email",
                }) 
                setValues({
                    ...Values,
                    [name]:""
                 })  
              }
            else{
          
             setErrors({
                ...errors ,
                [name]:""
             }) 
             setValues({
                ...Values,
                [name]:value
             }) 
            
           }        
      }
      //CONTACT NUMBER Checking..
      if( name == 'contact'){
        if( ! /^[6789][0-9]{9}$/i.test(value) ){
            setErrors({
                ...errors ,
                [name]:"enter valid contact number",
            }) 
            setValues({
                ...Values,
                [name]:""
             })  
          }
        else{
         setErrors({
            ...errors ,
            [name]:""
         }) 
         setValues({
            ...Values,
            [name]:value
         }) 
         
       }        
  }
        // address validating
        if(name =='address')
        {
            setValues({
                ...Values,
                [name]:value
            })  
        }

      //Age Checking..
      if( name == 'age'){
        if( ! /^[0-9]{2}$/i.test(value) ){
            setErrors({
                ...errors ,
                [name]:"enter valid age",
            }) 
            setValues({
                ...Values,
                [name]:""
             })  
          }
        else{
         setErrors({
            ...errors ,
            [name]:""
         }) 
         setValues({
            ...Values,
            [name]:value
         })  
       }        
     }
        // qualification validating
        if(name =='qualification')
        {
            setValues({
                ...Values,
                [name]:value
            })     
        }
          //office Id Checking..
      if( name == 'Id_no'){
        if( ! /^[0-9A-Za-z.-]{6,8}$/i.test(value) ){
            setErrors({
                ...errors ,
                [name]:"enter valid Id",
            }) 
            setValues({
                ...Values,
                [name]:""
             })  
          }
        else{
            setErrors({
                ...errors ,
                [name]:""
            }) 
            setValues({
                ...Values,
                [name]:value
            })    
       }        
     }
        // accessibility validating
        if(name =='accessibility')
        {  
            setValues({
                ...Values,
                [name]:value
            })  
        }
 }

    const handleSubmit =(e)=>{
        e.preventDefault();
                   var config={
                    headers:{'Access-Control-Allow-Origin':'*','Content-Type':'application/json'}

                   };
                 
        if(( ( ( Values.fullname && Values.email)  && (Values.contact && Values.address)) &&
             ((Values.age && Values.qualification) && (Values.Id_no && Values.designation ) )) && Values.accessibility
             ){
                   axios.post("http://localhost:9000/api/v1/e-res/createEmployee",Values).then(
                      (response)=>{
                         if(response.data == "Email exist"){ 
                             toast.error(" Email already  exist ! ",{position:'top-right'})
                         }else
                         {  
                            props.history.push("/EmployeeList"); 
                            // toast.success(" Data saved succcessfully ! ",{position:'top-right'})
                         }
                      }).
                      catch((error)=>{ 
                           alert(error);
                           console.log(error)
                      }
                   )  
             }else
             {
               toast.warning(" All fields are mandatory ",{position:'top-right',height:'20px',color:'red'})
             }
        }           
return( 
  
 <>
       < Menu /><br></br>
       <div className="main_div_addE">
         <div className="center_div_addE">
           <p className="p1" style={{backgroundColor:'rgb(11, 5, 102)'}}>
                      <BsFillPersonPlusFill /> Add Employee Data [s]
           </p> <hr />
           <Form onSubmit = { handleSubmit }>
               <Row>
                 <Col   lg={6} xs={12} sm={6} md={6}  style={{backgroundColor:''}}>
                     <label className="formlabel">Full name</label>
                        <input className="inpt11"
                            type="text"
                            autocomplete="off"
                            placeholder="enter fullname"
                            name="fullname"
                            onChange={handleChanges} >
                        </input>
                        <p style={{color:'red',fontSize:'12px',float:'right'}}>{errors.fullname}</p>
                        <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.fullname}</p>
                 </Col>
                 <Col   lg={6} xs={12} sm={6} md={6}  style={{backgroundColor:''}}>
                     <label className="formlabel">Accessibility</label>
                        <select className="inpt11" name="accessibility" onChange={handleChanges}> 
                        <option>Non-Admin-User</option>
                        <option>Admin-User</option>
                        </select>
                     <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.accessibility}</p>  
                   </Col>
               </Row><br></br>

               <Row>
               <Col   lg={6} xs={12} sm={6} md={6} >
                     <label className="formlabel">Email</label>
                         <input className="inpt11" 
                            type="text"
                            autoComplete="off"
                             placeholder="enter email"
                             name="email"
                             onChange={handleChanges}
                             >
                         </input>
                         <p style={{color:'red',fontSize:'12px',float:'right'}}>{errors.email}</p>
                        <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.email}</p>
                 </Col>
                 <Col  lg={6} xs={12} sm={6} md={6} >
                         <label className="formlabel">Address</label>
                         <select className="inpt11" name="address" onChange={handleChanges} > 
                          <option>West Bengal</option>
                          <option>Rajasthan</option> 
                          <option>Bihar</option>
                          <option>Tamil Nadu</option> 
                          <option>Orrisa</option>
                          <option>Haryana</option>
                        </select>
                        <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.address}</p>
                 </Col>
                
               </Row> <br></br>

               <Row>
                  <Col   lg={6} xs={12} sm={6} md={6}  style={{backgroundColor:''}}>
                     <label className="formlabel">Age</label>
                        <input className="inpt11"
                            type="text" 
                            placeholder="enter age" 
                            name="age"
                            onChange={handleChanges}> 
                        </input>
                        <p style={{color:'red',fontSize:'12px',float:'right'}}>{errors.age}</p>
                        <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.age}</p>
                  </Col>
                  <Col   lg={6} xs={12} sm={6} md={6}  style={{backgroundColor:''}}>
                     <label className="formlabel">Qualification</label>
                     <select className="inpt11"  name="qualification"  onChange={handleChanges} > 
                          
                          <option>B.Tech</option>
                          <option>M.Tech</option> 
                          <option>MCA</option>
                          <option>BCA</option> 
                          <option>MSC</option>
                          <option>BSC</option>
                        </select>
                     <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.qualification}</p>

                   </Col>
               </Row><br></br>

               <Row>
                   <Col lg={6} xs={12} sm={6} md={6}  style={{backgroundColor:''}}>
                     <label className="formlabel">Office Id</label>
                        <input className="inpt11" 
                            name="Id_no"
                            type="text" 
                            placeholder="enter office id" 
                            name="Id_no"
                            onChange={handleChanges}
                            > 
                        </input>
                     <p style={{color:'red',fontSize:'12px',float:'right'}}>{errors.Id_no}</p>
                     <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.Id_no}</p>

                   </Col>
                   <Col  lg={6} xs={12} sm={6} md={6} >
                      <label className="formlabel">Designation</label>
                         <select className="inpt11" name="designation" onChange={handleChanges}>
                          <option>Frontend Developer</option>
                          <option>Backend Developer</option> 
                          <option>UI Developer</option>
                          <option>Testing </option> 
                        </select>
                     <p style={{color:'red',fontSize:'12px',float:'right'}}>{errors.designation}</p>
                     <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.designation}</p>
                   </Col>
               </Row><br></br>

               <Row>
               <Col   lg={6} xs={12} sm={6} md={6}  style={{backgroundColor:''}}>
                     <label className="formlabel">Contact</label>
                     <input className="inpt11" 
                           type="text" placeholder="enter contact number"
                           name="contact"
                          onChange={handleChanges} >
                     </input>
                        <p style={{color:'red',fontSize:'12px',float:'right'}}>{errors.contact}</p>
                        <p style={{color:'green',fontSize:'12px',float:'right'}}>{Values.contact}</p>
                 </Col>
                 
                   <Col  lg={6} xs={12} sm={6} md={6} >
                         <label className="formlabel">Password</label>
                         <input className="inpt11" 
                           type="password"
                            disabled
                           name="password" value={code}> 
                         </input>
                        <p style={{fontSize:'12px',color:'orange'}}> default password</p>
                     </Col>
                     </Row>
                     <Row>
                       <Col  lg={12} xs={12} sm={12} md={12} >
                        <Button type="submit" variant="outline-info"> <FcCheckmark /> Save Data</Button>{' '}
                       </Col> 
                     </Row>
                </Form>
                < ToastContainer >  </ToastContainer>
              </div>
            </div>

  
    </>
);

}
export default AddEmployee;