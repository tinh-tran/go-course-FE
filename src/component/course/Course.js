import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import CourseTop from './CourseTop'
import CourseBottom from './CourseBottom'
import { Layout } from 'antd'
import './course.css'
const { Content } = Layout

class Course extends React.Component {
  state = {
    classnake: 0
  }
  handleAdd() {
    this.setState({
      classnake: this.state.classnake++
    })
  }
  render() {
    const { header, user, course, courseInfo, ChangeHeader, Login, Register, SearchItem, SelectCourse } = this.props
    header.currect = ['']
    return (
      <Layout className="layout">
        <Header header={header} user={user} ChangeHeader={ChangeHeader} Login={Login} Register={Register} SearchItem={SearchItem} />
        <Content style={{ boxShadow: '0 2px 8px 0 rgba(7,17,27,.06)', padding: '25px 50px' }}>
          <div style={{ background: '#fff', padding: 24, boxShadow: '0 2px 8px 0 rgba(7,17,27,.66)' }}>
          <CourseTop
              classinfo={course.classinfo}
              user={user}
              isSelect={course.isSelect}
              SelectCourse={SelectCourse}
              classnake={this.state.classnake}
              orderInfo = {course.orderInfo}
              status= {course.Status}
            />
          </div>
          <br />
          <br />
          <div style={{ background: '#fff', padding: 24, boxShadow: '0 2px 8px 0 rgba(7,17,27,.66)' }}>
          <CourseBottom
              handleAdd={this.handleAdd.bind(this)}
              classnake={this.state.classnake}
              classinfo={course.classinfo}
              courseInfo={courseInfo}
              isSelect={course.isSelect}
              user={user}
            />
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}
export default Course