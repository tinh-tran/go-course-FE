const initState = {
    isAuth: false,
    UserId: '',
    UserName: '',
    Role: '',
    Displayname: '',
    UserPhoto: ''
}

const INITIAL_USER = 'INITIAL_USER';
const LOGIN_FAILD = 'LOGIN_FAILD';
const RESTART_USER = 'RESTART_USER';
const LOAD_DISPLAYNAME = 'LOAD_DISPLAYNAME';
const REGISTER_FAILD = 'REGISTER_FAILD'; 
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

const user = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_FAILD:
            return { state }
        case REGISTER_FAILD: 
            return { state }
        case RESTART_USER:
            return { ...state, UserPhoto: action.UserPhoto, isAuth: true }
        case INITIAL_USER:
            return { ...action.info, isAuth: true };
        case LOAD_DISPLAYNAME:
            return { ...state, Displayname: action.Displayname }
        case REGISTER_SUCCESS:
            return { ...state, UserName: action.UserName }
        default:
            return state;
    }
}

export default user;
