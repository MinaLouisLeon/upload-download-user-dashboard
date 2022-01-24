const initailState = {
    allUsersData : null,
    selectedUser : {
        uid : "",
        username : "",
    },
    userFilesListRef : {},
}

const allUsersDataReducer = (state=initailState,action) => {
    switch(action.type){
        case 'setAllUsersData' :
            return{
                ...state,
                allUsersData : action.payload
            }
        case 'setSelectedUser' :
            return{
                ...state,
                selectedUser : {
                    uid : action.uid,
                    username : action.username
                }
            }
        case 'setUserFilesListRef' :
            return{
                ...state,
                userFilesListRef : action.payload
            }
        default :
            return state
    }
}

export default allUsersDataReducer;