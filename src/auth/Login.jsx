import { Form, Col, Row, Button} from "react-bootstrap"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {FaEye } from "react-icons/fa";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";



const schema = yup.object({
   
    email: 
        yup.string()
        .email('must be valid email')
        .trim().lowercase()
        .required('email is required'),
    password:
        yup.string()
        .required('password is required'),
        

      
  }).required();
  

const Login = () =>{
    const navigate = useNavigate()
    const location = useLocation()
    const { saveAuthInfo } = useContext(AuthContext)
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(schema),
    })
  
    const onSubmit = async (data) => {
        const { email, password } = data
    
        try {
          // api request to the server
          const res = await axios.post('http://localhost:1337/api/auth/local', {
            identifier: email,
            password,
          })
          // on successful response navigate to issues route
          saveAuthInfo(res.data)
          toast.success('Login successful')
          navigate(location?.state?.from || '/issues')
        } catch (err) {
          toast.error(err.response.data.error.message)
        }
      }

    const [passwordShown, setPasswordShown] = useState(false);


    const handelPassword = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    
    return(
        <>
        <Row>
           <h2 className="mb-3 mt-3 text-center">Login</h2>
            <Col sm={{span:8, offset: 2}}>
        <Form onSubmit={handleSubmit(onSubmit)}>
       

        <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
            <Form.Label htmlFor='email' column>
               Email
            </Form.Label>
            
            </Col>

            <Col sm={9}>
            <Form.Control 
             type='email'
             name='email'
             id='email'
             placeholder="Enter email" 
             isInvalid={errors.email}
             {...register('email')}
            />
            <Form.Control.Feedback type='inValid' className='d-block'>
                {errors.email?.message}
            </Form.Control.Feedback>
           </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
            <Form.Label htmlFor='password' column>
                Password
            </Form.Label>
            
            </Col>

            <Col sm={9}>
                
            <Form.Control 
             className="d-inline-flex"
             type={passwordShown ? "text" : "password"}
             name='password'
             id='password'
             placeholder="Enter password" 
             isInvalid={errors.password}
             {...register('password',  { pattern:  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/})}
             
            />
            <Button variant="light" onClick={handelPassword} className='btn-icon  d-flex flex-row-reverse ms-auto'> <FaEye className="text-secondary"/></Button>


            <Form.Control.Feedback type='inValid' className='d-block'>
                {errors.password?.message}
            </Form.Control.Feedback>
           </Col>
        </Form.Group>

       
        <div className="mt-3">
            <Button variant="primary" size="mb" disabled={isSubmitting} className="mb-3" type="submit">Login</Button>
        </div>
        </Form>
        </Col>
        </Row>
        </>
    )
}

export default Login