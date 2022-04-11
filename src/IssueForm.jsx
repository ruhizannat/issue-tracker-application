
import {Col, Form, Row, Button} from  'react-bootstrap'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import TextInput from './formInputs/TextINput';
import DateInput from './formInputs/DateInput';

import CommonCheckValuesInput from './formInputs/CommonCheckValuesInput';
import axiosAPI from './utils/axiosAPI';
import useToken from './hooks/useToken';
import SelectInput from './formInputs/SelectInput';





const IssueForm = ({addIssue, updateIssue, issue:issueToEdit}) =>{


   const [issue, setIssue] = useState({
      title: '',
      subTitle: '',
      assignedTo: '',
      startDate:  new Date(),
      endDate:  addDays(new Date(), 1),
      priority: '',
      status: '',
      completedPercentage: 0
   })



   const navigate = useNavigate()

 const [errors, setErrors] = useState({
   title: '',
   subTitle: '',
   assignedTo: '',
   startDate: '',
   endDate: '',
 })

  const {token, tokenLoaded} = useToken()
  const [users, setUsers] = useState(null)
const loadUser =async () =>{
 const data = await axiosAPI({
    method: 'get',
    url: '/users',
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    
     }
  })
  const users = data.map((user) => ({id: user.id, username: user.username}))
  setUsers(users)
}

 useEffect(() =>{
  if(tokenLoaded && token){
    loadUser()
  }

 }, [tokenLoaded, token])

 useEffect(() =>{
   if(issueToEdit){
      const {id, title, subTitle, assignedTo, startDate, endDate,priority, status, completedPercentage } = issueToEdit
      setIssue({id, title, subTitle, assignedTo, startDate, endDate,priority, status, completedPercentage})
   }
 }, [issueToEdit])


   const handelChange = (e) =>{
     setIssue({
         ...issue,
         [e.target.name]: e.target.value
     })

     setErrors({
         ...errors,
         [e.target.name]: ''
     })
   }

   const handelSubmit = (e) =>{
       e.preventDefault()
       const {title, subTitle, assignedTo, startDate, endDate} = issue
       // checking error
       if(title === ''){
           setErrors((prevErrors) =>({
               ...prevErrors,
                title:'Title is Required'
           }))
       }

       if(subTitle === ''){
           setErrors((prevErrors) =>({
               ...prevErrors,
               subTitle:'subTitle is Required'
           }))

          
       }

       if(assignedTo === ''){
           setErrors((prevErrors) =>({
               ...prevErrors,
               assignedTo:'assignedTo is Required'
           }))
       }


       if(startDate === ''){
           setErrors((prevErrors) =>({
               ...prevErrors,
               startDate:'startDate is Required'
           }))
       }

       if(endDate === ''){
           setErrors((prevErrors) =>({
               ...prevErrors,
               endDate:'endDate is Required'
           }))
       }


      

       // return true if every element is true , otherwise false
       const isValid = Object.values(issue).every((elm) => elm)

       if(issue.id && isValid){
         updateIssue({
            ...issue
         })
         
          
              
       }
       if(isValid && !issue.id){
           // form submission
          addIssue({
            
              ...issue
          })
         
          
           // reset after submitting
           // setIssue(defaultIssue)
       }
   }

   const {title, subTitle, assignedTo, startDate,endDate, priority, status, completedPercentage } = issue
   const {title:errorTitle, subTitle: errorSubTitle, assignedTo:errorAssignedTo, startDate: errorStartDate, endDate: errorEndDate} = errors
   
   const priorityValues = 
    [
      {
        name: 'priority',
        label: 'High',
        value: 'high',
        valueToCheck: priority

      },
      {
        name: 'priority',
        label: 'Medium',
        value: 'medium',
        valueToCheck: priority

      },
      {
        name: 'priority',
        label: 'Low',
        value: 'low',
        valueToCheck: priority

      },
    ]
     
const statusValues =[
  {
    name: 'status',
    label: 'New',
    value: 'new',
    valueToCheck: status

  },
  {
    name: 'status',
    label: 'In Progress',
    value: 'inProgress',
    valueToCheck: status

  },
  {
    name: 'status',
    label: 'Completed',
    value: 'completed',
    valueToCheck: status

  },
] 

    return(
      <div>
      <h1 className="mt-4 mb-4">{issueToEdit ? 'Edit Issue' : 'Add Issue'}</h1>
      <Form onSubmit={handelSubmit}> 
       
         
        <TextInput 
           label='Title'
           type='text'
           name='title'
           onChange={handelChange}
           value={title}
           placeholder='Enter your Task Name'
            error={errorTitle}
        />

      <TextInput 
           label='Sub Title'
           type='text'
           name='subTitle'
           onChange={handelChange}
           value={subTitle}
           placeholder='Enter your Task Details'
          error={errorSubTitle}
          as='textarea'
        />
      
       <SelectInput 
          label='Assigned To'
          name='assignedTo'
          onChange={handelChange}
          value={assignedTo}
          error={errorAssignedTo}
          users={users}
       
       />

      {/* <TextInput 
           label='Assigned To'
           type='text'
           name='assignedTo'
           onChange={handelChange}
           value={assignedTo}
           placeholder='Enter name whom you have assigned to'
          error={errorAssignedTo}
        /> */}



        <Form.Group as={Row} className='mb-3'>
         <Col sm={3}>
         <Form.Label htmlFor='startDate' column>Start Date</Form.Label>
         </Col>
         <Col sm={3}>
         <DateInput  
      
            name='startDate'
            selected={startDate} 
            onChange={(date) => 
            setIssue({
              ...issue,
              startDate: date,
            })
          }
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}

          value={startDate}

          error={errorStartDate}
          selectsStart
          />
           </Col>
          

            <Col sm={6} >
            <Row>
            <Col sm={3}>
         <Form.Label htmlFor='endDate' column>End Date</Form.Label>
         </Col>
         <Col sm={9}>
         <DateInput  
      
            name='endDate'
            selected={endDate} 
            onChange={(date) => 
            setIssue({
              ...issue,
              endDate: date,
            })
          }
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}

          value={endDate}

          error={errorEndDate}
          selectsEnd
          />

           </Col>
            </Row>
            </Col>
        
        </Form.Group>

      
        <CommonCheckValuesInput label='Priority' valueToIterate={priorityValues} onChange={handelChange} />

        <CommonCheckValuesInput label='Status' valueToIterate={statusValues} onChange={handelChange} />
                   
       

       <Form.Group as={Row} className='mb-3'>
        <Row>
            <Col sm={3}>
            <Form.Label htmlFor='completedPercentage' column>Completed In Percentage</Form.Label>
            </Col>
            <Col sm={4}>
            <Form.Range
               value={completedPercentage}
               name='completedPercentage'
               onChange={handelChange}
            />
            </Col>
            <Col sm={1}>{completedPercentage}</Col>
        </Row>

       </Form.Group>
        <Button variant='warning' size='md' type='submit'>{issueToEdit ? 'Update Issue' : 'Submit Issue'}</Button>
      </Form>
   </div>
    )
}
export default IssueForm