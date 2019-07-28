import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import UserInfo from '../admin/UserInfo'
import SelectClass from './SelectClass'

const { Content, Sider } = Layout

class Student extends React.Component {
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
        return <SelectClass user={this.props.user} />
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
            <Menu.Item key="2">
              <Icon type="appstore-o" />
              <span>My Course</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="line-chart" />
              <span>Bigdata</span>
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

export default Student
