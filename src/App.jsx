import 'bootstrap/dist/css/bootstrap.min.css';

import {Row, Container,Col} from 'react-bootstrap'
import Home from './Home';
import NotFound from './NotFound'
import './App.css'
import Navigation from './Navigation';
import AddIssue  from './AddIssue';
import EditIssue from './EditIssue';

import Issues from './Issues';
import { useState } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
const App =() =>{
  

  // const [totalCount, setTotalCount] = useState(0)
  // const [newCount, setNewCount] = useState(0)
  // const [progressCount, setProgressCount] = useState(0)
  // const [completedCount, setCompletedCount] = useState(0)

  
 
 
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
       <BrowserRouter>
     <Navigation />
    
     <Col sm={{span: 10, offset:1 }} >
        <Container>
        <Routes>
        <Route path='/' index element={  <Home />} />
          <Route path='/add' element={  <AddIssue />} />

          <Route path='/edit/:id' element={  <EditIssue  />} />
      
          <Route path='/issues' element={ <Issues   />} />
         <Route path='*' element={<NotFound />} />
        </Routes>
        </Container>
     </Col>
     </BrowserRouter>
     </Row>
   </div>
 )
  
}

export default App
