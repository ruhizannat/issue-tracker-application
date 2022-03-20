import { createContext, useReducer } from "react";
import { ADD_ISSUE_COUNTER, DELETE_ISSUE_COUNTER, UPDATE_ISSUE_COUNTER } from "../action";

import { barReducer } from "../barReducer";

export const BarCounterContext = createContext()

const initialState = {
    totalCount: 0,
    newCount: 0,
    progressCount: 0,
    completedCount:0
}
export const BarCounterContextProvider = ({children})  =>{
   
  const [counter, dispatch] =  useReducer(barReducer, initialState)
  
//  const [totalCount, setTotalCount] = useState(0)

//   const [newCount, setNewCount] = useState(0)
//   const [progressCount, setProgressCount] = useState(0)
//   const [completedCount, setCompletedCount] = useState(0)
const counterOnIssueAdd = (issue) => {
  dispatch({ type: ADD_ISSUE_COUNTER, payload: issue })
}
const counterOnIssueUpdate = (issue) => {
  dispatch({ type: UPDATE_ISSUE_COUNTER, payload: issue })
}
const counterOnIssueDelete = (issue) => {
  dispatch({ type: DELETE_ISSUE_COUNTER, payload: issue })
}
  const {totalCount, newCount, progressCount, completedCount} = counter

  const value = {
   totalCount,
   newCount, 
   progressCount,
   completedCount,
   counterOnIssueAdd,
   counterOnIssueUpdate,
   counterOnIssueDelete
     

  }
   return(
       <BarCounterContextProvider value={value}>
           {children}
       </BarCounterContextProvider>
   )
 
}