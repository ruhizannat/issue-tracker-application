import DatePicker from 'react-datepicker'
import { Form } from 'react-bootstrap'
const DateInput = ({name, selected, onChange, minDate,startDate, endDate, value, error, ...rest}) =>{
    return(
        <>
 <DatePicker
         type='date'
         name={name}
         selected={selected} 
         onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}

        value={value}

        isInvalid={error}
         {
             ...rest
         }
         />

       
         <Form.Control.Feedback type='inValid' className='d-block'>
            {error}
            </Form.Control.Feedback>
        </>
    )
}
export default DateInput