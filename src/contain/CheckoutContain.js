import React from 'react';
import Checkout from './../component/cart/Checkout';
import { connect } from 'react-redux'
import { ChangeHeader , SelectCourse , SearchItem, Login} from '../actions';


const ClassContain = props=>(<Checkout {...props}/>)

const mapStateToProps = state=>({
    shoppingcart:state.order.shoppingcart,
    header:state.header,
    user:state.user
})

export default connect(mapStateToProps , { ChangeHeader, SelectCourse, Login , SearchItem})(ClassContain);