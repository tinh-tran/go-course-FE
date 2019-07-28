const initState = [{
    CourseId:'',
    CourseImage:'',
    CourseName:'',
    CourseDescription:'',
    CoursePrice:'',
    SlotAvailable:'',
    SlotRegistered:'',
    CategoryName:''
}]

const LOAD_HOTCLASS = 'LOAD_HOTCLASS';

const hotclass = (state = initState, action) => {
    switch (action.type) {
        case LOAD_HOTCLASS:
            return action.hotclass;
        default:
            return state;
    }
}

export default hotclass;
