import React from 'react'
import axios from 'axios'
import { Table, Button, Popconfirm } from 'antd'
import { withRouter } from 'react-router-dom'

const { Column } = Table

class SelectClass extends React.Component {
  state = {
    myclass: [],
    process:0,
    number: 0,
    seenumber: 0

  }
  fecthData() {
    axios.post('/api/order/getmyclassbyid', { CustomerId: this.props.user.CustomerId }, { headers: { 'Content-Type': 'application/json',
    //'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/x-www-form-urlencoded'  } }).then(res => {
      let arr = []
      res.data.map((v, index) => {
        let obj = v
        obj.key = index
        arr.push(obj)
        return null
      })
      this.setState({
        myclass: arr
      })
    })
    axios
    .post('/api/course/seeone', { CourseId: this.state.myclass.CourseId, UserId: this.props.user.UserId },{ headers: { 'Content-Type': 'application/json',
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
  componentWillMount() {
    this.fecthData()
  }
  toClass(classid) {
    this.props.history.push(`/class/${classid}`)
  }
  DelectClass(classid) {
    console.log(classid)
  }
  render() {
    return (
      <div>
        <Table dataSource={this.state.myclass} bordered size="small">
          <Column title="CourseId" dataIndex="CourseId" key="CourseId" />
          <Column title="CourseName" dataIndex="CourseName" key="CourseName" />
          <Column title="OrderDate" dataIndex="OrderDate" key="OrderDate" />
          <Column title="CoursePrice" dataIndex="CoursePrice" key="CoursePrice" />
          <Column
            title="Active"
            key="action"
            render={text => (
              <span>
                <Button.Group>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.toClass(text.CourseId)
                    }}
                  >
                    To class
                  </Button>
                  <Popconfirm
                    title="Confirm Remove? "
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      this.DelectClass(text.CourseId)
                    }}
                  >
                    <Button type="danger" size="small">
                      Submit
                    </Button>
                  </Popconfirm>
                </Button.Group>
              </span>
            )}
          />
        </Table>
      </div>
    )
  }
}

export default withRouter(SelectClass)
