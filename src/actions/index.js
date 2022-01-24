//navReducer
export const actionSetNav = (url,title) => {
    return{
        type : "setNav",
        url : url,
        title : title,
    }
}

// userInfoReducer
export const actionSetUserInfo = (args) => {
    return{
        type : "setUserInfo",
        payload : args
    }
}

//allUsersDataReducer
export const actionSetAllUsers = (args) => {
    return{
        type : 'setAllUsersData',
        payload : args
    }
}

export const actionSetSelectedUser = (uid,username) => {
    return{
        type : "setSelectedUser",
        uid : uid,
        username : username,
    }
}

export const actionSetUserFilesListRef = (ListRefObj) => {
    return{
        type : "setUserFilesListRef",
        payload : ListRefObj,
    }
} 

//uploadDatraReducer
export const actionSetUploadReducer = (args) => {
    return{
        type : "setUploadData",
        payload : args
    }
}

export const actionResetUploadDataReducer = () => {
    return{
        type : "resetUploadData"
    }
}