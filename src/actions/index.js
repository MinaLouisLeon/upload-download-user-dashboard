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