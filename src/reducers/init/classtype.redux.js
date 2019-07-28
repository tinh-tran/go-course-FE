const initState = [{
    icon:'',
    CategoryID: 0,
    CategoryName: ''
}]

const LOAD_CLASSTYPE = 'LOAD_CLASSTYPE';

const classtype = (state = initState, action) => {
    switch (action.type) {
        case LOAD_CLASSTYPE:
            return action.classtype
        default:
            return state
    }
}

export default classtype;
