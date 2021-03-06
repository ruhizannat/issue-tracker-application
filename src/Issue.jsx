import { useContext, useState } from "react";
import {FaEdit, FaTrashAlt, FaCheckSquare  } from "react-icons/fa";
import {Badge, ProgressBar, Modal, Button  } from 'react-bootstrap';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { IssueContext } from "./context/IssueContext";

const Issue = ({issue}) =>{
  
    const { 
        id,
        title,
        priority,
        status,
        endDate,
        assignedTo,
        completedPercentage,} = issue

      const {deleteIssue, completeIssue} = useContext(IssueContext)

        const navigate= useNavigate()

        const [show, setShow] = useState(false);
        const handleClose = (evt) =>{ 
          // is user clicked on delete
           if(evt.target.dataset.action === 'delete'){
               // if delete button is clicked
              // you can delete issue
              deleteIssue(id)
             
           }
          
          setShow(false)
        
        };
        const handleShow = () => setShow(true);

        const lowClass = priority === 'low' ? 'warning' : ''
  const highClass = priority === 'high' ? 'danger' : ''
  const mediumClass = priority === 'medium' ? 'info' : ''
  const lowPercentageClass = completedPercentage < 30 ? 'danger' : ''
  const mediumPercentageClass =
    completedPercentage > 40 && completedPercentage <= 70
      ? 'info'
      : ''
  const HighPercentageClass =
    completedPercentage > 70 ? 'success' : ''

    const completedStatus = status === 'completed'?  <span style={{ textDecoration: 'line-through', color: 'red' }}>
    completed
  </span> : status

   const modal =( <Modal show={show} onHide={handleClose}>
   
   <Modal.Body>Are you sure you want to delete the issue?</Modal.Body>
   <Modal.Footer>
     <Button variant="danger" data-action="delete" onClick={handleClose}>
       Delete
     </Button>
     <Button variant="info" onClick={handleClose}>
      cancel
     </Button>
   </Modal.Footer>
 </Modal>)
    return(
      <>
      {modal}
        <tr key={id}>
        <td>{id}</td>
        <td>{title}</td>
        <td>
        <Badge bg={`${lowClass}${highClass}${mediumClass}`} pill>
          {priority}
        </Badge>
          
          </td>
        <td>{completedStatus}</td>
        <td>{format(new Date(endDate), 'dd/MM/yyyy')}</td>
        <td>{assignedTo}</td>
        <td>
        <ProgressBar
          variant={`${HighPercentageClass}${mediumPercentageClass}${lowPercentageClass}`}
          label={completedPercentage}
          now={completedPercentage}
          striped
          animated
        />


          </td>
        <td className='d-flex justify-content-between'>
            <FaEdit onClick={() =>navigate(`/edit/${id}`)} className='text-info'/>
            <FaCheckSquare className='text-success' 
            onClick={() =>completeIssue(id)} />
            <FaTrashAlt className='text-danger' onClick={handleShow}/>
        </td>
      </tr>
      </>
    )
}

export default Issue