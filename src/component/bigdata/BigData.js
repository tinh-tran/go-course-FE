import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Layout, Row, Col } from 'antd'
const { Content } = Layout

class BigData extends React.Component {
  render() {
    const { header, user, ChangeHeader, Login, SearchItem } = this.props
    header.currect = ['3']
    return (
      <Layout className="layout">
        <Header header={header} user={user} ChangeHeader={ChangeHeader} Login={Login} SearchItem={SearchItem} />
        <Content style={{ boxShadow: '0 2px 8px 0 rgba(7,17,27,.06)', padding: '25px 50px' }}>
          <div style={{ background: '#fff', padding: 24, boxShadow: '0 2px 8px 0 rgba(7,17,27,.66)' }}>
            <Row>
              <Col span={10}>

              </Col>
              <Col span={14}>
                
              </Col>
            </Row>
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}

export default BigData
