import { createContext, useContext, useReducer } from 'react'
import  {issueReducer}  from '../issueReducer'
import {ADD_ISSUE, COMPLETE_ISSUE, DELETE_ISSUE, UPDATE_ISSUE} from '../action'


export const IssueContext = createContext()

const initialState = [
    {
    id: "fe5b8e0b-f2b7-47ec-9da1-c068cb3b2663",
    title: 'sample task',
    subTitle: 'task description',
    assignedTo: 'ruhi',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'low',
    status: 'new',
    completedPercentage: 90
  },
]
export  const IssueProvider = ({children}) =>{
    const [issues, dispatch] = useReducer(issueReducer, initialState)

    // const {setTotalCount, setNewCount, setProgressCount, setCompletedCount} = useContext(BarCounterContext)

    const addIssue = (issue) =>{
      dispatch({type:  ADD_ISSUE,  payload: issue})
     
      
      //   if(issue.status === 'new'){
      //     setNewCount(prevCount => prevCount + 1)
      //   }
      //   if(issue.status === 'InProgress'){
      //    setProgressCount(prevCount => prevCount + 1)
      //  }
      //  if(issue.status === 'completed'){
      //    setCompletedCount(prevCount => prevCount + 1)
      //  }
       }

       const deleteIssue = (id) =>{
           dispatch({type: DELETE_ISSUE, payload: id})
        
       }
     
       const updateIssue = (issueToUpdate) =>{
           dispatch({type: UPDATE_ISSUE, payload: issueToUpdate})
         
       }

       const completeIssue = (id) =>{
        dispatch({type: COMPLETE_ISSUE, payload: id})
    

      }

    const value ={
        issues,
        addIssue,
        deleteIssue,
        updateIssue,
        completeIssue,
    }
    return(
        <IssueContext.Provider value={value} >
         {children}
        </IssueContext.Provider>
    )
}