
import React ,{Suspense , lazy } from 'react';
//import './App.css';
import Home from './components/Home';
import {BarLoader} from 'react-spinners';
//import { Button } from 'react-bootstrap';
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Todo from './components/ToDo';
import AddEmployee from './components/AddEmployee';
import ErrorPage   from './components/ErrorPage';
import LandingPage from './components/LandingPage';
import Menu from './components/Menu';
import CrudLanding  from './components/CrudLanding';
import MyProfile    from './components/MyProfile';
import EmployeeList from './components/EmployeeList';
import EditEmployee   from  './components/EditEmployee';
import EmployeeDetail from './components/EmployeeDetail';
import Attandance  from   './components/Attandance';
import ImageSlider from   './components/ImageSlider';
import Notice      from   './components/Notice';
import ViewNotice  from   './components/ViewNotice';
import AddNotice   from   './components/AddNotice';
import EditNotice  from   './components/EditNotice';
//const Home = lazy(()=>import('./components/Home'))
function  App() {
  return (
  
   <Router>
     <div className="App" >
   <Switch>
    
  {/*} <Suspense fallback={<div>loading...</div>}>
       <Route exact  path="/"                  c
        <Route exact path ="/"       component={Home} />
      </Suspense>*/}

         <Route exact path ="/"                  component={Home} />
         <Route exact path ="/EmployeeList"      component={EmployeeList} />
         <Route exact path ="/Todo/:EmpId"       component={Todo} />
         <Route exact path ="/AddEmployee"       component={AddEmployee} />
         <Route exact path ="/Landingpage"       component={LandingPage} />
         <Route exact path ="/CrudLanding"       component={CrudLanding} />
         <Route exact path ="/MyProfile"         component={MyProfile} />
         <Route exact path ="/Menu"              component={Menu} />
         <Route exact path ="/Attendance/:EmpId" component={Attandance} />
         <Route exact path ="/ViewEmployee/:id"  component={EmployeeDetail} />
         <Route exact path ="/EditEmployee/:id"  component={EditEmployee} />
         <Route exact path ="/Notice"            component={Notice} />
         <Route exact path ="/ViewNotice/:NoticeId" component={ViewNotice} />
         <Route exact path ="/AddNotice"         component={AddNotice} />
         <Route exact path ="/EditNotice/:NoticeId"        component={EditNotice} />
         <Route exact path ="/ImageSlider"       component={ImageSlider} />


      <Route component={ErrorPage} />
  </Switch>
  
     </div>
   </Router>
   
  );
}

export default App;
 