import {ADD_ISSUE, COMPLETE_ISSUE, DELETE_ISSUE, UPDATE_ISSUE} from './action'

export const issueReducer = (state, action) =>{
    const {type, payload} = action
    switch(type){
        case ADD_ISSUE :
            return [...state, payload]
        case DELETE_ISSUE :
            const issuesAfterDelete =  state.filter(issue =>issue.id != payload)
            return [...issuesAfterDelete] 
        case UPDATE_ISSUE :
            const issueAfterUpdate = state.map(issue =>{
                if(issue.id === payload){
                  return{
                    ...payload,
                    id: issue.id,
                    status: 
                    parseInt(payload.completedPercentage) < 100 ? 
                     'InProgress' : payload.status,
                  }
                  }else{
                   return issue
                }
              })
            return [...issueAfterUpdate]  
            case COMPLETE_ISSUE :
                const issueAfterCompletion = state.map(issue =>{
                    if(issue.id === payload){
                      return{
                        ...issue,
                        status: 'completed',
                        completedPercentage:100
                      }
                    }else{
                      return issue
                    }
                    
                  })
                  return [...issueAfterCompletion]
            default:
                return state

            
    }

}