import { Form, Row, Col } from "react-bootstrap"

const SelectInput = (
    {
        label, name, onChange, value, error , users
    
    }) =>{
   
    return(
        <>
            <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
            <Form.Label htmlFor={name} column>   {label}
            </Form.Label>
            
            </Col>

            <Col sm={9}>
            <Form.Select 
           
             name={name}
             id={name}
             onChange={onChange}
             value={value}
          
             isInvalid={error}
            
            >
                <option value=''>Name the person you want assigned to</option>
                {users && users.map((user) => ( 
                  <option key={user.id} value={user.id}>{user.username}</option>
                
                ))}
               
            </Form.Select >    
            <Form.Control.Feedback type='inValid' className='d-block'>
             {error}
            </Form.Control.Feedback>
           </Col>
        </Form.Group>
        
        </>
    )
}
export default SelectInput