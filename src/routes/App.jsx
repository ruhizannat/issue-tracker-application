import 'bootstrap/dist/css/bootstrap.min.css';

import {Row, Container,Col } from 'react-bootstrap'
import Home from '../Home';
import NotFound from '../NotFound'

import Navigation from '../Navigation';
import AddIssue  from '../AddIssue';
import EditIssue from '../EditIssue';

import Issues from '../Issues';
import {  ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Register from '../auth/Register';
import Login from '../auth/Login';
import AuthRequired from './AuthRequire';
import PublicRoute from './PublicRoute';







const App =() =>{
  

  
  
 
 
 return(
   <div>
     <ToastContainer 
      
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
       
     />
     <Row>

     <Navigation />
    
     <Col sm={{span: 10, offset:1 }} >
        <Container>
        <Routes>
        <Route path='/' index element={  <Home />} />
          <Route path='/add' element={  
           <AuthRequired>

             <AddIssue />
           </AuthRequired>
          
          } />

          <Route path='/edit/:id' element={ 
             <AuthRequired>

               <EditIssue  />

             </AuthRequired>
            
            } />
      
          <Route path='/issues' element={
             <AuthRequired>

               <Issues   />

             </AuthRequired>
            
            } />
          <Route path='/register' element={ 
            <PublicRoute>

              <Register   />

            </PublicRoute>
          
          } />
          <Route path='/login' element={
             <PublicRoute>
               <Login/>


             </PublicRoute>
            
            } />
         <Route path='*' element={<NotFound />} />
        </Routes>
        </Container>
     </Col>
    
     </Row>
   </div>
 )
  
}

export default App
