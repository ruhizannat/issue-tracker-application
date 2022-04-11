import { Spinner } from "react-bootstrap"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';

const PublicRoute =({children})=>{
    const location = useLocation()
    const {user, userLoaded} = useContext(AuthContext)
    if(userLoaded){
      if(!user) return children
      return <Navigate to={location?.state?.from ||'/issues' }/>
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
  export default PublicRoute