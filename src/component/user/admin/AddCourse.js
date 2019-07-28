import React from 'react'
import axios from 'axios'
import { Form, Row, Col, Button, Input, Divider } from 'antd'

class AddSchool extends React.Component {
  state = {
    username: '',
    password: '',
    belong: ''
  }
  changeName(val, type) {
    this.setState({
      [type]: val.target.value
    })
  }
  createSchool() {
    let userinfo = {
      username: this.state.username,
      password: this.state.password,
      belong: this.state.belong,
      type: 'class'
    }
    axios.post('/api/admin/createpeople', { ...userinfo }).then(res => {
      console.log(res.data)
    })
  }
  render() {
    return (
      <div>
        <Form>
          <Divider>Add Course</Divider>
          <Row>
            <Col span={12} offset={6} style={{ textAlign: 'center' }}>
              <br />
              <Row>
                <Col
                  span={4}
                  style={{
                    lineHeight: '32px',
                    textAlign: 'center'
                  }}
                >
                  Account Course  ：
                </Col>
                <Col span={20}>
                  <Input
                    placeholder="Input UserName"
                    onChange={e => {
                      this.changeName(e, 'username')
                    }}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col
                  span={4}
                  style={{
                    lineHeight: '32px',
                    textAlign: 'center'
                  }}
                >
                  Password Default ：
                </Col>
                <Col span={20}>
                  <Input
                    placeholder="Input Password"
                    onChange={e => {
                      this.changeName(e, 'password')
                    }}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col
                  span={4}
                  style={{
                    lineHeight: '32px',
                    textAlign: 'center'
                  }}
                >
                  Course Title ：
                </Col>
                <Col span={20}>
                  <Input
                    placeholder="Course Title"
                    onChange={e => {
                      this.changeName(e, 'belong')
                    }}
                  />
                </Col>
              </Row>
              <br />
              <Button
                type="primary"
                onClick={() => {
                  this.createSchool()
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default AddSchool
