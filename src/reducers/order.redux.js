const initState = {
    CustomerId:0,
    CourseId:0,
    shoppingcart:[]
}

const LOAD_CART = 'LOAD_CART';
const REMOVE_CART= 'REMOVE_CART'

const order = (state = initState, action) => {
    switch (action.type) {
        case LOAD_CART:
            return {...state , shoppingcart:action.shoppingcart}
        case REMOVE_CART:
            return {...state , shoppingcart:action.shoppingcart}    
        default:
            return state
    }
}

export default order;
