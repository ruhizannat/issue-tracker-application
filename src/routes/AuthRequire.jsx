import { useContext } from "react";
import { Spinner } from "react-bootstrap"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';




const AuthRequired = ({children}) =>{
    const location = useLocation()
    const {user, userLoaded}= useContext(AuthContext)
    if(userLoaded){
      if(  !user){
        return <Navigate to='/login' state={{from : location.pathname}}/>
        
      }else{
    
        return children
      }
  
     }else{
       return(
          <div style={{
            display: 'grid',
            placeItems: 'center',
            minHeight: '100vh'
          }}>
                <Spinner animation="grow" size="sm" />
          </div>
       )
     }
    
  }
export default AuthRequired  