import IssueForm from "./IssueForm"
import { useContext, useEffect, useState } from 'react'


import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IssueContext } from "./context/IssueContext";
import axiosAPI from "./utils/axiosAPI";
import useToken from "./hooks/useToken";
import formatIssue from "./utils/formatIssue";
import { parseISO } from "date-fns";
const EditIssue = () =>{

    
    const [issue, setIssue] = useState(null)

   const {issues, updateIssue} = useContext(IssueContext)
   const {token, tokenLoaded} =useToken()
    const navigate = useNavigate()
    const {id}  = useParams()
    console.log(id)

    const issueToEdit = async () =>{
   
      const data = await axiosAPI({
        method: 'get',
        url: `/issues/${+id}?populate=assignedTo`,
       
       config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
       }
         
      })
      const issue = formatIssue(data.data)
      console.log(issue)
      // const foundIssue =  issues.find(issue => issue.id === id)
      // if(!foundIssue){
      //     toast.error('issue is not found to be updated')
      //     return navigate('/issues')
      // }
      setIssue({
        ...issue,
        startDate: parseISO(issue.startDate),
        endDate: parseISO(issue.endDate),
        assignedTo: issue.assignedTo.data.id,
      })
    }

    useEffect(() =>{
      if(tokenLoaded, token){
        issueToEdit()

      }
    }, [id, tokenLoaded])

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
