
import { Form, Col, Row } from "react-bootstrap"

import CheckInput from './CheckInput';

const CommonCheckValuesInput = ({label, valueToIterate, onChange}) =>{
    return(
        <>
           <Form.Group as={Row} className='mb-3'>
       
       <Col sm={3}>
       <Form.Label htmlFor='priority' column>{label}</Form.Label>
       </Col>
        {valueToIterate.map((elm, index) =><CheckInput
          key={index}
          name={elm.name}
          label={elm.label}
          value={elm.value}
          onChange={onChange}
          valueToChecked={elm.valueToChecked}

       />
      )
        }
       </Form.Group>
        </>
    )
}

export default CommonCheckValuesInput