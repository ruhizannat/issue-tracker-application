import {Table} from 'react-bootstrap'
import IssueBar from './IssueBar';
import Issue from './issue';
import { useContext } from 'react';
import { IssueContext } from './context/IssueContext';
const Issues = () =>{

  const {issues} = useContext(IssueContext)
  console.log(issues)

    return(
        <div>
          <h1>All Issues</h1>
          <IssueBar   />
           <Table striped bordered hover>
              <thead>
                <tr >
                  <th>ID</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>DueDate</th>
                  <th>AssignedTo</th>
                  <th>Completed</th>
                  <th>Action</th>
                </tr>
              </thead>

              
              <tbody>
    
        {issues.map((issue) =>
        <Issue key={issue.id} issue={issue} 
    
        />)}
        </tbody>
      </Table>
   </div>
    )
}
export default Issues