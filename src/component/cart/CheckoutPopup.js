import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout"
import {Button} from 'antd'
import {STRIPE_KEY, PaymentApi} from '../../config'

const config = {headers: {"Content-Type": "text/plain"}}
const CURRENCY = "USD";
const fromUSDToCent = amount => amount * 100;
class CheckoutPopup extends React.Component{
    constructor(props){
        super(props);
        this.toClass = this.toClass.bind(this);
    }
    toClass(classid){
        this.props.history.push(`/class/${classid}`)
    }
    render() {
        const {name, description, amount, orderInfo, classinfo, user} = this.props
        const successPayment = data => {
            alert("Payment Success");
            let cartInfo = {
                OrderId:orderInfo.OrderId,
                CustomerId: user.CustomerId,
                CourseId : classinfo.CourseId,
                Status : 1 
            }
            axios.post('/api/order', {...cartInfo} , config).then(res => {
                window.location.reload()
            })
        };
        const errorPayment = data => {
                alert("Payment Error");
        };
        
        const onToken = (amount, description) => token =>
            axios
                .post(PaymentApi+"/debits", {
                description,
                tokenid: token.id,
                currency: CURRENCY,
                amount: fromUSDToCent(amount)
                },config)
                .then(successPayment)
                .catch(errorPayment);
        return (
            <StripeCheckout
                name={name}
                description={description}
                amount={fromUSDToCent(amount)}
                token={onToken(amount, description)}
                currency={CURRENCY}
                stripeKey={STRIPE_KEY}>
                <Button type="danger" >Checkout</Button>
            </StripeCheckout>
        )
    }
}
export default CheckoutPopup;