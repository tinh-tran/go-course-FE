import React from 'react'
import axios from 'axios'
import { Row, Col, Button, Input, Divider, Upload, message, Icon } from 'antd'
import {ImageApi} from '../../../config'
class CommonUpdate extends React.Component {
  state = {
    fileList: []
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps
  }
  
  handleSubmit = file => {
    const {way} = this.props
    const formData = new FormData()
    formData.append('File', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    if (way  == "SectionPdf") {
      axios.post(ImageApi+`/upload/pdf`, formData, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      const dataSec= {
        'CourseSectionId' : this.props.CourseSectionId,
        'CourseId' : this.props.CourseId,
        'SectionPdf' :file.name
      }
      axios
      .post('/api/course/section/addresource', dataSec, { headers: { 'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded'  } })
      .then(res => {
        message.success('Sucess')
        this.props.handleChange()
        this.setState({
          fileList: []
        })
      })
    } else {
      axios.post(ImageApi+`/upload/video`, formData, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      const dataSec= {
        'CourseSectionId' : this.props.CourseSectionId,
        'CourseId' : this.props.CourseId,
        'SectionVideo' : file.name
      }
      axios
      .post('/api/course/section/addresource', dataSec, { headers: { 'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded' } })
      .then(res => {
        message.success('Sucess')
        this.props.handleChange()
        this.setState({
          fileList: []
        })
      })
    }
   
  }
  render() {
    return (
      <div style={{ display: 'inline' }}>
        {this.state.fileList.length < 1 ? (
          <Upload action = {this.handleSubmit}
                beforeUpload={this.beforeUpload}
          >
            <Button type={this.props.type}>
              <Icon type="upload" /> {this.props.name}
            </Button>
          </Upload>
        ) : (
          <Button
            size="small"
            type="primary"
            onClick={() => {
              this.handleSubmit()
            }}
          >
            Submit
          </Button>
        )}
      </div>
    )
  }
}

export default CommonUpdate
