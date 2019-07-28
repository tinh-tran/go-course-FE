import React from 'react'
import { Row, Col, Progress, Button } from 'antd'
import axios from 'axios'
import CheckoutPopup from '../cart/CheckoutPopup'
class CourseTop extends React.Component {
  state = {
    number: 0,
    seenumber: 0,
    process: 0
  }
  seclectCourse(price , OrderId, CourseId, CustomerId){
    {price == 0 ? (
      this.props.SelectCourse(OrderId, CourseId, CustomerId , 1)
    ): (
      this.props.SelectCourse(OrderId, CourseId, CustomerId , 2)
    )
    }
  }
  fecthData() {
    axios.post('/api/course/section/byid', {CourseId : this.props.classinfo.CourseId},{ headers: { 'Content-Type': 'application/json',
    //'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/x-www-form-urlencoded' }} ).then(res => {
      const classsection = res.data
      let number = 0
      if (classsection.length > 0) {
        classsection.map(v => {
          if (v.SectionVideo) {
            number++
          }
          if (v.SectionPdf) number++
        })
      } else {
        this.setState({
          number: 0
        })
      }
      if (this.state.seenumber != 0 && this.number != 0) {
        this.setState({
          number: number,
          process: this.state.seenumber * 100 / number
        })
        //this.giveSeeScore()
      } else {
        this.setState({
          number: number
        })
      }
    })
    axios
      .post('/api/course/seeone', { CourseId: this.props.classinfo.CourseId, UserId: this.props.user.UserId },{ headers: { 'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded' }})
      .then(res => {
        let seenumber = 0
        res.data.map(v => {
          if (v.Video === 'Yes') {
            seenumber++
          }
          if (v.Pdf === 'Yes') {
            seenumber++
          }
        })
        if (this.state.number != 0) {
          this.setState({
            seenumber: seenumber,
            process: seenumber * 100 / this.state.number
          })
          //this.giveSeeScore()
        } else {
          this.setState({
            seeclass: seenumber
          })
        }
      })
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps
    this.fecthData()
  }
  render() {
    const { classinfo ,user, orderInfo, status } = this.props
    var price = this.props.classinfo.CoursePrice;
    var src = "/images/course/" + classinfo.CourseImage;
    console.log(status)
    return (
      <Row style={{ height: '140px' }} key={this.props.classnake}>
        <Col span={6}>
        <div className="courseimage-reponsive"><img width={272} src={src} alt="Image" width="250px" />
        </div>
        </Col>
        <Col span={13}>
          <h1> {classinfo.CourseName} </h1>
          <p> {classinfo.CourseDescription} </p>
        </Col>
        <Col span={5} style={{ textAlign: 'center' }}>
          {status == 1 ? (
            <Progress
              style={{ marginTop: '10px' }}
              type="dashboard"
              percent={this.state.process}
              format={p => {
                if (p === 100) {
                  return 'Success'
                } else {
                  return `${parseInt(p)}%`
                }
              }}
            />
            ) : (
                <div>
                  {price == 0 ?( 
                    <Button
                      size="large"
                      type="primary"
                      style={{ marginTop: '50px' }}
                      onClick={() => this.seclectCourse(price, parseInt(orderInfo.OrderId), parseInt(classinfo.CourseId), parseInt(user.CustomerId))}
                      >
                        Enroll now
                      </Button>
                      ) : (
                     <div>
                          <h1> <b>{price}$</b></h1>
                            { status == 2 ? ( // 
                                <CheckoutPopup
                                name={user.UserId+"_"+orderInfo.OrderId}
                                orderInfo= {orderInfo}
                                classinfo={classinfo}
                                user={user}
                                description={user.UserId+"_"+classinfo.CourseName }
                                amount={classinfo.CoursePrice}
                                />): (
                            <div>
                              <Button
                                size="large"
                                type="primary" 
                                icon="shopping-cart"
                                style={{ marginTop: '5px' }}
                                onClick={() => this.seclectCourse(price, parseInt(orderInfo.OrderId), parseInt(classinfo.CourseId), parseInt(user.CustomerId))}
                                >
                                Add to cart                      
                              </Button>  <br />
                              <CheckoutPopup
                                name={user.UserId+"_"+orderInfo.OrderId}
                                orderInfo= {orderInfo}
                                classinfo={classinfo}
                                user={user}
                                description={user.UserId+"_"+classinfo.CourseName }
                                amount={classinfo.CoursePrice}
                              />
                            </div>)}  
                      </div>
                    )        
                  }
                </div>
          )}
        </Col>
      </Row>
    )
  }
}
export default CourseTop;
