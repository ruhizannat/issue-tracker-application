import { useContext } from "react"
import { IssueContext } from "./context/IssueContext"
import IssueForm from "./IssueForm"

const AddIssue = () =>{
   const {addIssue}= useContext(IssueContext)
    const handelIssue = (issue) =>{
        console.log(issue)
        // adding Issue
        addIssue(issue)
    }
    return(
        <div>
           <IssueForm addIssue={handelIssue} />
        </div>
    )
}
export default AddIssue