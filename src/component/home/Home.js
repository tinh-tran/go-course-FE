import React, { Component } from 'react'
import { Layout, Col} from 'antd'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ListCourse from '../listcourse/ListCourse'
import BarCarousel from '../barcarousel/BarCarousel';

const { Content } = Layout

class Home extends Component {
  componentWillMount() {
    this.props.LoadHotClass()
    this.props.LoadPicture()
  }
  render() {
    const {
      header,
      user,
      ChangeHeader,
      Login,
      Register,
      init,
      SearchItem,
      indeximg
    } = this.props
    header.currect = ['1']
    //console.log(JSON.stringify(user))
    return (
      <Layout className="layout">
        <Header
          header={header}
          user={user}
          ChangeHeader={ChangeHeader}
          Login={Login}
          Register={Register}
          SearchItem={SearchItem}
        />
        <Content
          style={{
            boxShadow: '0 2px 8px 0 rgba(7,17,27,.06)',
            padding: '25px 50px'
          }}
        >
        <BarCarousel indeximg={indeximg}/>
          <ListCourse courseList={init.hotclass} />
        </Content>
        <Footer />
      </Layout>
    )
  }
}

export default Home