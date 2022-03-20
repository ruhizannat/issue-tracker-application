import { Form, Col } from "react-bootstrap"


const CheckInput = ({name, label, value, onChange, valueToChecked}) =>{
    return(
        <>
       
       
      
       <Col sm='auto'>
       <Form.Check 
          type="radio"
          onChange={onChange}
          name={name}
          label={label}
          value={value}
          checked={valueToChecked === value}
        />
       </Col>
       
        </>
    )
}

export default CheckInput