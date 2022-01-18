const initialState = {
    page : '/'
}

const navReducer = (state=initialState,action) => {
    switch(action.type){
        case "setNav" :
            return{
                ...state,
                page : action.payload
            }
        default :
            return state
    }
}

export default navReducer;