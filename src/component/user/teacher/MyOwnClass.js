import React from 'react'
import axios from 'axios'
import { Table, Button, Divider, message, Modal, Tabs, Icon } from 'antd'
import UpdateClass from '../admin/UpdateClass'
import AddVideoPdf from './AddVideoPdf'
import StudentJoin from '../StudentJoin'
const TabPane = Tabs.TabPane
const { Column } = Table

class MyOwnClass extends React.Component {
  state = {
    classList: [],
    visible: false,
    openModalkey: 0,
    UpdateData: {}
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  openModal(row) {
    this.setState({ visible: true, UpdateData: row, openModalkey: this.state.openModalkey++ })
  }

  online(CourseId) {
    axios.post('/api/course/updatestatus', { CourseId: CourseId, sqltable: 'julinclass', Status : 1 }).then(res => {
      message.success('Sucess')
      this.fecthdata()
    })
  }
  outline(CourseId) {
    axios.post('/api/class/updatestatus', { CourseId: CourseId, sqltable: 'julinclass', Status : 0 }).then(res => {
      message.success('Success')
      this.fecthdata()
    })
  }
  fecthdata() {
    axios.post('/api/course/createid', { CreateId: this.props.user.UserId }, { headers: { 'Content-Type': 'application/json',
    //'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/x-www-form-urlencoded' }}).then(res => {
      res.data.map((v, index) => {
        v.key = index
        return v
      })
      this.setState({
        classList: res.data
      })
    })
  }
  componentDidMount() {
    this.fecthdata()
  }
  render() {
    return (
      <div>
        <Divider>My Coures</Divider>
        <Table dataSource={this.state.classList} bordered>
          <Column title="Course Name" dataIndex="CourseName" key="CourseName" />
          <Column title="CreateBy" dataIndex="CreateId" key="CreateId" />
          <Column title="Student Seclect" dataIndex="StudentJoined" key="StudentJoined" />
          <Column title="Status" dataIndex="Status" key="Status" />
          <Column
            title="Active"
            key="action"
            render={(text, record) => (
              <span>
                <Button.Group>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.openModal(record)
                    }}
                  >
                    Manager
                  </Button>
                  {record.Status ? (
                    <Button
                      type="danger"
                      onClick={() => {
                        this.outline(record.CourseId)
                      }}
                    >
                      Deactive
                    </Button>
                  ) : (
                    <Button
                      type="danger"
                      onClick={() => {
                        this.online(record.CourseId)
                      }}
                    >
                      Active
                    </Button>
                  )}
                </Button.Group>
              </span>
            )}
          />
        </Table>
        <Modal
          title="Course Managerment"
          visible={this.state.visible}
          width="800px"
          closable={false}
          onCancel={this.hideModal}
          onOk={this.hideModal}
        >
          <Tabs defaultActiveKey="2">
            <TabPane
              tab={
                <span>
                  <Icon type="edit" />Edit default course information
                </span>
              }
              key="1"
            >
              <UpdateClass
                key={this.state.UpdateData.CourseId}
                classinfo={this.state.UpdateData}
                openModalkey={this.state.openModalkey}
                user= {this.props.user}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="folder-add" />Add Chapter
                </span>
              }
              key="2"
            >
              <AddVideoPdf
                key={this.state.openModalkey}
                classinfo={this.state.UpdateData}
                CourseId={this.state.UpdateData.CourseId}
                openModalkey={this.state.openModalkey}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="person" />Student Join
                </span>
              }
              key="3"
            >
             <StudentJoin 
              key={this.state.UpdateData.CourseId}
              classinfo={this.state.UpdateData}
              openModalkey={this.state.openModalkey}
             />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MyOwnClass
