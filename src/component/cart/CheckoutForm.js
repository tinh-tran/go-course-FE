import React, { Component } from "react"
import {Col,Row, Divider,Input, Button} from 'antd'
import {PaymentApi} from '../../config'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe
} from "react-stripe-elements"
import axios from "axios"

class CheckoutForm extends Component {
  state = {
    validationError: "",
    fullname:"",
    shoppingcart:{}
  }
  handleSubmit (event) {
    this.setState(this.state.shoppingcart = this.props.shoppingcart)
    const CURRENCY = "USD";
    const fromUSDToCent = amount => amount * 100;
    const url = PaymentApi +"/debits";
    const {fullname, shoppingcart} = this.state;
    const {user} = this.props
    console.log(shoppingcart)
    event.preventDefault();
    const successPayment = response  => {
      for (let i = 0; i < shoppingcart.length; i++) {
        this.props.SelectCourse(shoppingcart[i].OrderId,shoppingcart[i].CourseId, shoppingcart[i].CustomerId, 1)
      }
      window.location.reload()
    }
    if (this.props.stripe) {
      this.props.stripe.createToken({ name: fullname }).then(payload => {
        if (payload.error) {
          this.setState({ validationError: payload.error.message });
        } else {
          console.log("[token]", payload);
          console.log(payload.token.id);
          const config = {headers: {"Content-Type": "text/plain"}}
          axios.post(url,{
                    currency:CURRENCY,
                    description: user.UserId+"_"+fullname,
                    tokenid: payload.token.id,
                    amount: fromUSDToCent(this.props.total)
                  }, config)
            .then(response => {
              successPayment()
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  onChange = (field, val) => {
    const { value } = val.target
    this.setState({
      [field]: value,
    });
  }

  render() {
    const elementStyles = {
      base: {
        fontSize: "18px",
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#9e2146"
      }
    };
    return (
      <Row style={{ height: '100%', width: "100%" }}>
          <Col span={20} offset={6}>
              <Divider orientation="left"> <h1>Total:<b>{this.props.total}$</b></h1></Divider>
          </Col>
            <Col span={20} offset={6}>
              <Row>
                <Col span={20} style={{
                    lineHeight: '32px',
                    textAlign: 'left'
                  }}
                  >
                  Full Name：
                </Col>
                <Col span={20}>
                  <Input
                    placeholder="Input your fullname"
                    value={this.state.fullname}
                    onChange= {e => {this.onChange('fullname',e)}}
                  />
                </Col>
              </Row>
              <Row>
                  <Col
                    span={20}
                    style={{
                      lineHeight: '32px',
                      textAlign: 'left'
                    }}
                  >
                  Card Number：
                  </Col>
                  <Col span={20}  style={{ lineHeight: '32px',
                      paddingTop: '5px'
                    }}>
                      <CardNumberElement style={elementStyles} />
                  </Col>
              </Row>
              <Row>
                <Col
                  span={20}
                  style={{
                    lineHeight: '32px',
                    textAlign: 'left',
                    paddingTop: '5px'
                  }}
                >
                Expiration date:
                </Col>
                <Col span={20}  style={{
                  lineHeight: '32px'
                      }}>
                  <CardExpiryElement style={elementStyles} />
                </Col>
              </Row>
              <Row>
                  <Col
                  span={20}
                  style={{
                    lineHeight: '32px',
                    textAlign: 'left',
                    paddingTop: '5px'
                  }}
                  >
                  CVC：
                      </Col>
                  <Col span={20}  style={{
                  lineHeight: '32px'
                      }}>           
                      <CardCVCElement style={elementStyles} />
                  </Col>
              </Row>
              <Row>
                <Col
                  span={20}
                  style={{
                    lineHeight: '32px',
                    textAlign: 'left',
                    paddingTop: '5px'
                  }}
                  >
                  Postal code：
                  </Col>
                <Col span={20}  style={{
                    lineHeight: '32px'
                        }}>
                      <PostalCodeElement style={elementStyles} />
                </Col>
              </Row>
              <Row>
                <Col
                span={20}
                style={{
                  lineHeight: '32px',
                  textAlign: 'left',
                  paddingTop: '5px'
                      }}
              >
              <Col span={20}  style={{
                  lineHeight: '32px'
                      }}>
                {this.state.validationError || ""}
               </Col>
              </Col>
              </Row>
              <Col span={20}>
                  <Button  size="large" style={{float:"right"}} type="danger" onClick={(event)=> this.handleSubmit(event)}>Checkout</Button>       
              </Col>
              </Col>
            </Row>
    );
  }
}

export default injectStripe(CheckoutForm);