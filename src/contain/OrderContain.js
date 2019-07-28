import React from 'react';
import CartList from '../component/cartlist/CartList';
import { connect } from 'react-redux'
import { ChangeHeader, LoadCart, SearchItem, Login, RemoveCart, Register} from '../actions';


class OrderContain extends React.Component{
    componentDidMount(){
        this.props.LoadCart(parseInt(this.props.user.CustomerId));
    }
    render(){
        return(
            <CartList {...this.props} />
        )
    }
}

const mapStateToProps = state=>({
    order:state.order,
    header:state.header,
    user:state.user
})


export default connect(mapStateToProps , { ChangeHeader, LoadCart, SearchItem, Login, RemoveCart, Register })(OrderContain);