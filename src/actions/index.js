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