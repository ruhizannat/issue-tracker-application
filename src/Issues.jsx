import {Pagination, Table} from 'react-bootstrap'
import IssueBar from './IssueBar';
import Issue from './issue';
import { useContext, useState } from 'react';
import { IssueContext } from './context/IssueContext';


const generateArr = (num) => {
  const arr = []
  for (let i = 1; i <= num; i++) {
    arr.push(i)
  }
  return arr
}


const Issues = () =>{

  const {issues, pageCount, pageNumber, setPageNumber} = useContext(IssueContext)
  const [currentPage, setCurrentPage] = useState(0)
  const pageCountArr = generateArr(pageCount)
   const handlePageClick = (e) =>{
    setPageNumber(+e.target.dataset.id)
   }
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
      <Pagination style={{ justifyContent: 'center' }}>
     
        {pageCountArr.includes(currentPage - 1) && <Pagination.Prev onClick={() =>{
                              setCurrentPage(currentPage - 1);
                              setPageNumber(currentPage - 1);
          
        }}/>} 
     
        {pageCountArr.map((count, i) => {
          return (
            <Pagination.Item
              onClick={handlePageClick}
              active={count === pageNumber}
              data-id={count}
              key={i}
            >
              {count}
            </Pagination.Item>
          )
        })}
      
      {pageCountArr.includes(currentPage + 1) &&  <Pagination.Next onClick={() =>{
          setCurrentPage(currentPage + 1);
          setPageNumber(currentPage + 1);
      }}/>}  
       
      </Pagination>
   </div>
    )
}
export default Issues