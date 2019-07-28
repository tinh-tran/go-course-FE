import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import UserInfo from './UserInfo'
import Addcourse from './AddCourse'

const { Content, Sider } = Layout
const SubMenu = Menu.SubMenu

class Admin extends React.Component {
  state = {
    key: '1'
  }
  GetContent(key) {
    switch (key) {
      case '1':
        return (
          <UserInfo
            ChangeUserInfo={this.props.ChangeUserInfo}
            user={this.props.user}
            RestartUser={this.props.RestartUser}
          />
        )
      case '2':
        return 2
      case '3':
        return 3
      case '4':
        return 4
      case '5':
        return 5
      case '6':
        return <Addcourse />
      case '7':
        return 7
      case '8':
      case '10':
        return 10
      default:
        return null
    }
  }
  changeContain(item) {
    this.setState({
      key: item.key
    })
  }
  render() {
    const rightContent = <div>{this.GetContent(this.state.key)}</div>
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Menu theme="dark" defaultSelectedKeys={[this.state.key]} mode="inline" onClick={v => this.changeContain(v)}>
            <Menu.Item key="1">
              <Icon type="solution" />
              <span>User Info</span>
            </Menu.Item>
            <SubMenu
              key="sub0"
              title={
                <span>
                  <Icon type="user" />
                  <span>Manager Website</span>
                </span>
              }
            >
              <Menu.Item key="2">Manager Slider</Menu.Item>
              <Menu.Item key="3">Popular Course</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Manager Class</span>
                </span>
              }
            >
              <Menu.Item key="4">View</Menu.Item>
              <Menu.Item key="5">OverView</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Manager Course</span>
                </span>
              }
            >
              <Menu.Item key="6">New Course</Menu.Item>
              <Menu.Item key="10">My Course</Menu.Item>
              <Menu.Item key="7">Manager Type</Menu.Item>
            </SubMenu>
            <Menu.Item key="11">
              <Icon type="line-chart" />
              <span>BigData</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: 24, background: '#fff', minHeight: 360 }}>{rightContent}</Content>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
