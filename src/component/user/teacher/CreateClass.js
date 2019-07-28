import React from 'react'
import axios from 'axios'
import { Row, Col, Button, Input, Divider, Upload, message, Icon, DatePicker, Select } from 'antd'
import { runInThisContext } from 'vm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {ImageApi} from '../../../config'

const Option = Select.Option
class CreateClass extends React.Component {
    state = {
      CourseId: 0,
      CourseName: '',
      CourseDescription: '',
      CourseImage:'',
      StartDate: null,
      EndDate: null,
      CoursePrice: 100,
      CreateID: this.props.user.UserId,
      SlotAvailable: 0,
      SlotRegistered: 0,
      CategoryID: 0,
      endOpen: false,
      cateList: []
    }
    componentDidMount(){
      axios.get('/api/category').then(res => {
      this.setState({
        cateList: res.data
      })
    })
    }
    SubmitAction() {
      let courseInfo = {
        CourseId : this.state.CourseId ? this.props.course.CourseId : 0,
        CourseName: this.state.CourseName,
        CourseDescription: this.state.CourseDescription,
        CoursePrice: this.state.CoursePrice,
        CourseImage: this.state.CourseImage,
        CreateID: this.props.user.UserId,
        CategoryID: this.state.CategoryID,
        StartDate: this.state.StartDate,
        EndDate: this.state.EndDate,
        SlotAvailable: parseInt(this.state.SlotAvailable),
        SlotRegistered: parseInt(this.state.SlotRegistered),
        Status: 1 
      }
      axios.post('/api/course', {...courseInfo}, { headers: { 'Content-Type': 'application/json',
            //'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/x-www-form-urlencoded' }}).then(res => {
              if (res.data === 'ok') {
                this.setState({
                  fileList: [],
                  CourseName: '',
                  CourseDescription: '',
                  CoursePrice: 0,
                  SlotAvailable: 0,
                  SlotRegistered: 0,
                  CategoryID: 0,
                  StartDate: null,
                  EndDate: null,
                  CoursePrice: 100
                })
                message.success('Sucess')
              } else {
                message.error('Error')
              }
            })
          }
    handleSubmit() {
      if (
        this.state.CourseImage &&
        this.state.CourseName &&
        this.state.CourseDescription &&
        this.state.CoursePrice &&
        this.state.StartDate &&
        this.state.EndDate
      ) {
        let SlotAvailable = parseInt(this.state.SlotAvailable)
        let SlotRegistered = parseInt(this.state.SlotRegistered)
        if (SlotRegistered <= SlotAvailable) {
          this.SubmitAction()
        } else {
          message.error('SlotRegistered < SlotAvailable')
        }
      } else {
        message.error('New error')
      }
    }
    changeName(val, type) {
      const { value } = val.target
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
      switch (type) {
        case 'CategoryID':
          if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.setState({
              CategoryID: value
            })
          }
          break
        case 'test':
          if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.setState({
              [type]: value
            })
          }
          break
        case 'offline':
          if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.setState({
              [type]: value
            })
          }
          break
        default:
          this.setState({
            [type]: value
          })
      }
    }
    onChange = (field, value) => {
      this.setState({
        [field]: value,
      });
    }
    disabledStartDate = (StartDate) => {
      const EndDate = this.state.EndDate;
      if (!StartDate || !EndDate) {
        return false;
      }
      return StartDate.valueOf() > EndDate.valueOf();
    }

    disabledEndDate = (EndDate) => {
      const StartDate = this.state.StartDate;
      if (!EndDate || !StartDate) {
        return false;
      }
      return EndDate.valueOf() <= StartDate.valueOf();
    }

    onStartChange = (value) => {
      this.onChange('StartDate', value);
    }

    onEndChange = (value) => {
      this.onChange('EndDate', value);
    }

    handleStartOpenChange = (open) => {
      if (!open) {
        this.setState({ endOpen: true });
      }
    }

    handleEndOpenChange = (open) => {
      this.setState({ endOpen: open });
    }
    imageUpload = file => {
      const data = new FormData();
      data.append('File', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(ImageApi+`/upload/course`, data, config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        this.setState({'CourseImage': file.name})
    };
  render() {
    const { StartDate, EndDate, endOpen, cateList } = this.state;
    const categoryContain = [];
    for (let i = 0; i < cateList.length; i++) {
      categoryContain.push(<Option key={cateList[i].CategoryID} value={cateList[i].CategoryID}>{cateList[i].CategoryName}</Option>)
    }
    //const category = <div style={{ display: 'flex', padding: '10px 5px' }}>{categoryContain}</div>
    return (
      <div>
        <Divider>Add new Course</Divider>
        <br />
        <Row>
          <Col
            span={4}
            style={{
              lineHeight: '32px',
              textAlign: 'center'
            }}
          >
            Course Name ：
          </Col>
          <Col span={20}>
            <Input
              placeholder="Input Course Name"
              value={this.state.CourseName}
              onChange={e => {
                this.changeName(e, 'CourseName')
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
            Course Price ：
          </Col>
          <Col span={20}>
          <Input
              addonBefore="$"
              value={this.state.CoursePrice}
              onChange={e => {
                this.changeName(e, 'CoursePrice')
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
          CategoryID ：
          </Col>
          <Col span={20}>
          <div className="item">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            value={this.state.CategoryID}
            onChange={e => {
              this.onChange('CategoryID',e [1] )
            }}
          >
          {console.log(this.state.CategoryID)}
            {categoryContain}
          </Select>
          </div>
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
          Date ：
          </Col>
          <Col span={20}>
            <DatePicker  
              disabledDate={this.disabledStartDate}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={StartDate}
              placeholder="Start"
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange} />
            <DatePicker
                disabledDate={this.disabledEndDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={EndDate}
                placeholder="End"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
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
          Course Image ：
          </Col>
          <Col span={20}>
            <Upload
                  name="avatar"
                  action={this.imageUpload}
                  listType="picture-card"
                  beforeUpload={this.beforeUpload}
                  >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Upload Image.
                  </p>
                </Upload>
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
            Course Description ：
          </Col>
          <Col span={20}>
          <ReactQuill
              modules={CreateClass.modules}
              formats={CreateClass.formats}
              value={this.state.CourseDescription}
              placeholder="Body"
              onChange={e => {this.onChange('CourseDescription', e)}}
          />
          </Col>
        </Row>
        <br />
        <Divider>Slot</Divider>
        <Row>
          <Col
            span={4}
            style={{
              lineHeight: '32px',
              textAlign: 'center'
            }}
          >
           Slot Available ：
          </Col>
          <Col span={4}>
            <Input
              addonAfter="%"
              value={this.state.SlotAvailable}
              onChange={e => {
                this.changeName(e, 'SlotAvailable')
              }}
            />
          </Col>
          <Col
            span={4}
            style={{
              lineHeight: '32px',
              textAlign: 'center'
            }}
          >
            Slot Registered ：
          </Col>
          <Col span={4}>
            <Input
              addonAfter="%"
              value={this.state.SlotRegistered}
              onChange={e => {
                this.changeName(e, 'SlotRegistered')
              }}
            />
          </Col>
        </Row>
        <br />
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            onClick={() => {
              this.handleSubmit()
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      
    )
  }
}
CreateClass.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};

CreateClass.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default CreateClass
