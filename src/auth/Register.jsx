import { Form, Col, Row, Button} from "react-bootstrap"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {FaEye } from "react-icons/fa";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";



const schema = yup.object({
    username: 
        yup.string()
        .required('username is Required')
        .min(4, 'username must be 4 or more in length'),
    email: 
        yup.string()
        .email('must be valid email')
        .trim().lowercase()
        .required('email is required'),
    password:
        yup.string()
        .required('password is required')
        .min(8, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),

      confirmPassword:
        yup.string()
        .required('confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
  }).required();
  

const Register = () =>{
    const navigate = useNavigate()
    const {saveAuthInfo} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });
  
    const onSubmit =async data => {
        const {username, email, password} =data
        // API request to the server
        try{
            const res =  await axios.post('http://localhost:1337/api/auth/local/register',{
                username,
                email,
                password,
            })
            // on successful response navigate to issues route
              console.log(res.data)
              saveAuthInfo(res.data)
              toast.success('Registration successful')
              navigate('/issues')

        }catch(err){
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
           <h2 className="mb-3 mt-3 text-center">Register</h2>
            <Col sm={{span:8, offset: 2}}>
        <Form onSubmit={handleSubmit(onSubmit)}>
           <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
            <Form.Label htmlFor='username' column>
                Username
            </Form.Label>
            
            </Col>

            <Col sm={9}>
            <Form.Control 
             type='text'
             name='username'
             id='username'
             placeholder="Enter username" 
             isInvalid={errors.username}
             {...register('username')}
            />
            <Form.Control.Feedback type='inValid' className='d-block'>
                {errors.username?.message}
            </Form.Control.Feedback>
           </Col>
        </Form.Group>

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
           
             type={passwordShown ? "text" : "password"}
             name='password'
             id='password'
             placeholder="Enter password" 
             isInvalid={errors.password}
             {...register('password',  { pattern:  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,  })}
             
            />
              <Button variant="light" onClick={handelPassword} className='btn-icon  d-flex flex-row-reverse ms-auto'> <FaEye className="text-secondary"/></Button>
            <Form.Control.Feedback type='inValid' className='d-block'>
                {errors.password?.message}
            </Form.Control.Feedback>
           </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
            <Form.Label htmlFor='confirmPassword' column>
                Confirm Password
            </Form.Label>
            
            </Col>

            <Col sm={9}>
            <Form.Control 
            type={passwordShown ? "text" : "password"}
             name='confirmPassword'
             id='confirmPassword'
             placeholder="Enter confirmPassword" 
             isInvalid={errors.confirmPassword}
             {...register('confirmPassword')}
            />
           <Button variant="light" onClick={handelPassword} className='btn-icon d-flex flex-row-reverse ms-auto'> <FaEye className="text-secondary"/></Button>
            <Form.Control.Feedback type='inValid' className='d-block'>
                {errors.confirmPassword?.message}
            </Form.Control.Feedback>
           </Col>
        </Form.Group>
        <div className="mt-3">
            <Button variant="primary" size="mb" disabled={isSubmitting} className="mb-3" type="submit">Register</Button>
        </div>
        </Form>
        </Col>
        </Row>
        </>
    )
}

export default Register