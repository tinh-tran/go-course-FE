const initState = {
    currect: ['1'],
}
const CHANGE_HEADER = 'CHANGE_HEADER';

const header = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_HEADER:
            return {currect:action.currect};        
        default:
            return state
    }
}

export default header;
