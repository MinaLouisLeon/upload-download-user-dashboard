const initailState = {
    allUsersData : null
}

const allUsersDataReducer = (state=initailState,action) => {
    switch(action.type){
        case 'setAllUsersData' :
            return{
                ...state,
                allUsersData : action.payload
            }
        default :
            return state
    }
}

export default allUsersDataReducer;