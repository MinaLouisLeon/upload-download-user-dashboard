const intialState = {
    objectData : {}
}

const uploadDataReducer = (state=intialState,action) => {
    switch(action.type){
        case "setUploadData" :
            return {
                ...state,
                objectData : action.payload
            }
        case "resetUploadData" : 
            return{
                ...state,
                objectData : {}
            }
        default :
            return state
    }
}

export default uploadDataReducer;