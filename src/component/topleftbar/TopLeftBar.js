import React from 'react'
import './topleftbar.css'
import axios from 'axios'
import { Icon, Popover, Menu } from 'antd'
import ListCourseItem from '../listcourseitem/ListCourseItem'
import ListCourse from '../listcourse/ListCourse'

class TopLeftBar extends React.Component {
  state = {
    allCourse: [''],
    allCategory: ['']
  }
  componentWillMount() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
//      'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/x-www-form-urlencoded'
      }  
    }
    let info ={ 
        CategoryID:0,
        Page:1
    }
    axios.post("/api/course/bycat", {...info}, config).then(res => {
      this.setState({
        allCourse: res.data
     })
    })
    
  }

  render() {
    const gridStyle = {
      width: '25%',
      textAlign: 'center'
    }
    const allContain = this.state.allCourse.map((v, index) => (
      <div style={{ flex: 1, marginLeft: '3px' }} key={index}>
        <ListCourseItem 
            CourseId={v.CourseId}
            CourseImage={v.CourseImage} 
            CourseName={v.CourseName} 
            CoursePrice={v.CoursePrice} 
            SlotAvailable={v.SlotAvailable} 
            SlotRegistered={v.SlotRegistered} 
            CategoryName={v.CategoryName}
        />
      </div>
    )) 
    console.log(JSON.stringify(alllist))
    const alllist = <div style={{ display: 'flex', padding: '10px 5px' }}>{allContain}</div>
    return (
      <div className="menuContent">
       <div className="item">
        <Popover content={alllist} placement="right">
            <a>
              <span className="group">ALL</span>
              <i>
                <Icon type="right-circle-o" />
              </i>
            </a>
          </Popover>
    </div>
      </div>
    )
  }
}

export default TopLeftBar
