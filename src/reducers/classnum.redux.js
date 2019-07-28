const initState = {
    CategoryID:0,
    Num: 8
}

const LOAD_CLASSNUM = "LOAD_CLASSNUM";

const classnum = (state = initState, action) => {
    switch (action.type) {
        case LOAD_CLASSNUM:
            return { CategoryID:action.CategoryID , Num:action.classnum };
        default:
            return state
    }
}

export default classnum
