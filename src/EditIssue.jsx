import IssueForm from "./IssueForm"
import { useContext, useEffect, useState } from 'react'


import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IssueContext } from "./context/IssueContext";
const EditIssue = () =>{

    
    const [issue, setIssue] = useState(null)

   const {issues, updateIssue} = useContext(IssueContext)
    const navigate = useNavigate()
    const {id}  = useParams()
    console.log(id)

    const issueToEdit = () =>{
      const foundIssue =  issues.find(issue => issue.id === id)
      if(!foundIssue){
          toast.error('issue is not found to be updated')
          return navigate('/issues')
      }
      setIssue(foundIssue)
    }

    useEffect(() =>{
       issueToEdit()
    }, [id])

  const handelUpdateIssue = (issue) =>{
    console.log(issue)
    updateIssue(issue)
  }

    return(
        <div>
           <IssueForm updateIssue={handelUpdateIssue} issue={issue} />
        </div>
    )
  
}
export default EditIssue
