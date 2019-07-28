const initState = [{
    CourseId: '',
    CourseImages: ''
}]

const LOAD_IMG = 'LOAD_IMG';

const indeximg = (state = initState, action) => {
    switch (action.type) {
        case LOAD_IMG:
            return [...action.img];
        default:
            return state
    }
}

export default indeximg;
