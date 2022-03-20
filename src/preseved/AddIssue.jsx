import { useState } from 'react'
import {Col, Form, Row, Button} from  'react-bootstrap'
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultIssue = {
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
    priority: 'low',
    status: 'new',
    completedPercentage: 1
}
const AddIssue = ({addIssue}) =>{

   

    const [issue, setIssue] = useState(defaultIssue)
    const navigate = useNavigate()

  const [errors, setErrors] = useState({
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
  })
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
        if(isValid){
            // form submission
           addIssue({
               id: uuid(),
               ...issue
           })
            toast.success('issue is added successfully')
            navigate('/issues')
            // reset after submitting
            // setIssue(defaultIssue)
        }
    }

    const {title, subTitle, assignedTo, startDate,endDate, priority, status, completedPercentage } = issue
    const {title:errorTitle, subTitle: errorSubTitle, assignedTo:errorAssignedTo, startDate: errorStartDate, endDate: errorEndDate} = errors

    return(
        <div>
           <h1 className="mt-4 mb-4">Add Issue</h1>
           <Form onSubmit={handelSubmit}>
             <Form.Group as={Row} className='mb-3'>
                 <Col sm={3}>
                 <Form.Label htmlFor='title' column	>Title</Form.Label>
                 
                 </Col>

                 <Col sm={9}>
                 <Form.Control 
                  type='text'
                  name='title'
                  id='title'
                  onChange={handelChange}
                  value={title}
                  placeholder='Enter your Task Name'
                  isInvalid={errorTitle}
                 />
                 <Form.Control.Feedback type='inValid' className='d-block'>
                 {errorTitle}
                 </Form.Control.Feedback>
                </Col>
             </Form.Group>

             <Form.Group as={Row} className='mb-3'>
                 <Col sm={3}>
                 <Form.Label htmlFor='title' column	>Sub Title</Form.Label>
                 
                 </Col>

                 <Col sm={9}>
                 <Form.Control 
                  as='textarea'
                  name='subTitle'
                  id='subTitle'
                  onChange={handelChange}
                  value={subTitle}
                  placeholder='Enter your Task Details'
                  isInvalid={errorSubTitle}
                 />
                  <Form.Control.Feedback type='inValid' className='d-block'>
                 {errorSubTitle}
                 </Form.Control.Feedback>
                </Col>
             </Form.Group>

             <Form.Group as={Row} className='mb-3'>
                 <Col sm={3}>
                 <Form.Label htmlFor='title' column	>Assigned To</Form.Label>
                 
                 </Col>

                 <Col sm={9}>
                 <Form.Control 
                 type='text'
                  name='assignedTo'
                  id='assignedTo'
                  onChange={handelChange}
                  value={assignedTo}
                  placeholder='Enter your Task Details'
                  isInvalid={errorAssignedTo}
                 />
                  <Form.Control.Feedback type='inValid' className='d-block'>
                 {errorAssignedTo}
                 </Form.Control.Feedback>
                </Col>
             </Form.Group>

             <Form.Group as={Row} className='mb-3'>
              <Col sm={3}>
              <Form.Label htmlFor='startDate' column>Start Date</Form.Label>
              </Col>
              <Col sm={3}>
              <Form.Control 
              type='date'
              name='startDate'
              onChange={handelChange}
              value={startDate}
              placeholder='Enter your Start Date'
              isInvalid={errorStartDate}
              />

            
              <Form.Control.Feedback type='inValid' className='d-block'>
                 {errorStartDate}
                 </Form.Control.Feedback>
                </Col>

                 <Col sm={6} >
                 <Row>
                 <Col sm={3}>
              <Form.Label htmlFor='startDate' column>End Date</Form.Label>
              </Col>
              <Col sm={9}>
              <Form.Control 
              type='date'
              name='endDate'
              onChange={handelChange}
              value={endDate}
              placeholder='Enter your End Date'
              isInvalid={errorEndDate}
              />

            
              <Form.Control.Feedback type='inValid' className='d-block'>
                 {errorEndDate}
                 </Form.Control.Feedback>
                </Col>
                 </Row>
                 </Col>
             
             </Form.Group>

             <Form.Group as={Row} className='mb-3'>
            
             <Col sm={3}>
             <Form.Label htmlFor='priority' column>Priority</Form.Label>
             </Col>
             <Col sm='auto'>
             <Form.Check 
                type="radio"
                onChange={handelChange}
                name='priority'
                label='High'
                value='high'
                checked={priority === 'high'}
              />
             </Col>
             <Col sm='auto'>
             <Form.Check 
                type="radio"
                onChange={handelChange}
                name='priority'
                label='Medium'
                value='medium'
                checked={priority === 'medium'}
              />
             </Col>

             <Col sm='auto'>
             <Form.Check 
                type="radio"
                onChange={handelChange}
                name='priority'
                label='Low'
                value='low'
                checked={priority === 'low'}

              />
             </Col>
             </Form.Group>

             <Form.Group as={Row} className='mb-3'>
            
            <Col sm={3}>
            <Form.Label htmlFor='priority' column>Status</Form.Label>
            </Col>
            <Col sm='auto'>
            <Form.Check 
               type="radio"
               onChange={handelChange}
               name='status'
               label='New'
               value='new'
               checked={status === 'new'}
             />
            </Col>
            <Col sm='auto'>
            <Form.Check 
               type="radio"
               onChange={handelChange}
               name='status'
               label='In Progress'
               value='InProgress'
               checked={status === 'InProgress'}
             />
            </Col>

            <Col sm='auto'>
            <Form.Check 
               type="radio"
               onChange={handelChange}
               name='status'
               label='Completed'
               value='completed'
               checked={status === 'low'}

             />
            </Col>
            </Form.Group>

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
             <Button variant='warning' size='md' type='submit'>Submit Issue</Button>
           </Form>
        </div>
    )
}
export default AddIssue 