import React, { Children } from 'react'
import axios from 'axios'
import { Card, List, Button, message, Icon, Modal, Row, Col, Input,Tabs } from 'antd'
import swal from 'sweetalert2'
import { getCourseInfo, getQuizInfo } from '../../../selecter'
import {QuizApi} from '../../../config'
import CommonUpdate from '../admin/CommonUpdate'
import AnswerUpdate from '../admin/AnswerUpdate'
const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane
class AddVideoPdf extends React.Component {
  state = {
    classinfo: [],
    quizinfo:[],
    visible: false,
    classchapter: [],
    classsection: [],
    classquiz:[],
    chaptername: ''
  }
  handleChange = newData => {
    this.fecthData()
  }
  handleCancel() {
    this.setState({
      visible: false
    })
  }
  openModel() {
    this.setState({
      visible: true
    })
  }
  openModel1(item, chapterid) {
    swal({
      title: 'Add Section title',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit'
    }).then(res => {
      axios
        .post('/api/course/section', {
          ChapterId: chapterid,
          CourseId: this.props.CourseId,
          SectionName: res.value,
          SectionOrder: item.contain.length + 1 || 1
        }, { headers: { 'Content-Type': 'application/json',
        //'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then(res => {
          message.success('Success')
          this.fecthData()
        })
    })
  }
  openModel2(item, chapterid) {
    swal({
      title: 'Add Quiz title',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit'
    }).then(res => {
      axios
        .post(QuizApi+'/api/quiz', {
          ChapterId: chapterid,
          CourseId: this.props.CourseId,
          QuizContent: res.value,
          //SectionOrder: item.contain.length + 1 || 1
        }, { headers: { 'Content-Type': 'application/json',
        //'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then(res => {
          message.success('Success')
          this.fecthData()
        })
    })
  }

  componentWillMount() {
    this.fecthData()
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps
    this.fecthData()
  }
  fecthData() {
    axios.post('/api/course/chapter/byid', {CourseId: this.props.classinfo.CourseId},{ headers: { 'Content-Type': 'application/json',
    //'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/x-www-form-urlencoded' }}).then(chapter => {
      const classchapter = chapter.data
      this.setState({
        classchapter: classchapter
      })
    axios.post('/api/course/section/byid', {CourseId: this.props.classinfo.CourseId},{ headers: { 'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded' }}).then(section => {
        const classsection = section.data
        this.setState({
          classinfo: getCourseInfo(classchapter, classsection),
          classsection: classsection
        })
      })
      axios.post(QuizApi+'/api/onequiz/getonequiz', {CourseId: this.props.classinfo.CourseId},{ headers: { 'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded' }}).then(quiz => {
        const classquiz = quiz.data
        this.setState({
          quizinfo: getQuizInfo(classchapter, classquiz),
          classquiz: classquiz
        })
      })
    })
  }
  AddChapter() {
    axios
      .post('/api/course/chapter', {
        CourseId: this.props.CourseId,
        ChapterName: this.state.chaptername,
        ChapterOrder: this.state.classinfo.length + 1 || 1
      },{ headers: { 'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded' }})
      .then(res => {
        message.success('Sucess')
        this.handleCancel()
        this.fecthData()
      })
  }
  renderThing(items,index) {
    return (
      <div>
          <Row>
            <Col span={17} >
                <span style={{ float:'left', border:"1px" }}><b>{items.AnswerContent}</b></span>
                <AnswerUpdate 
                  type="danger"
                  name="EditAnswer"
                  way={items.AnswerId}
                  AnswerId={items.AnswerId}
                  //CourseId={this.props.CourseId}
                  //handleChange={this.handleChange}
                  //ChapterId={this.state.classchapter[index].ChapterId}
                />  
            </Col>
            <Col span={7}>
                <span style={{ float:'right' }}>{items.Status}</span> 
            </Col>     
          </Row>
          
      </div>
         
    );
  }
  render() {
    const ClassList = this.state.classinfo.map((item, index) => (
      <div>
        <Card key={index} type="inner" title={item.title} style={{ marginTop: '18px' }}>
          <Button
            onClick={() => {
              this.openModel1(item, this.state.classchapter[index].ChapterId)
              }}
            >
            <Icon type="plus" />Add Course Section
          </Button>
          <List
            bordered
            dataSource={item.contain}
            renderItem={item => (
              <List.Item>
                {item.title}
                {item.SectionVideo ? (
                  <CommonUpdate
                    type="danger"
                    name="Edit Video"
                    way="SectionVideo"
                    CourseSectionId={item.CourseSectionId}
                    CourseId={this.props.CourseId}
                    handleChange={this.handleChange}
                  />
                ) : (
                  <CommonUpdate
                    type=""
                    name="UploadVideo"
                    way="SectionVideo"
                    CourseSectionId={item.CourseSectionId}
                    CourseId={this.props.CourseId}
                    handleChange={this.handleChange}
                  />
                )}
                {item.SectionPdf ? (
                  <CommonUpdate
                    type="danger"
                    name="Edit PDF"
                    way="SectionPdf"
                    CourseSectionId={item.CourseSectionId}
                    CourseId={this.props.CourseId}
                    handleChange={this.handleChange}
                  />
                ) : (
                  <CommonUpdate
                    type=""
                    name="Upload PDF"
                    way="SectionPdf"
                    CourseSectionId={item.CourseSectionId}
                    CourseId={this.props.CourseId}
                    handleChange={this.handleChange}
                  />
                )}
              </List.Item>
            )}
          />
        </Card>
      </div>
    ))
    const ClassQuiz = this.state.quizinfo.map((item, index) => (
      <Card key={index} type="inner" title={item.title} style={{ marginTop: '18px' }}>
          <Button
            onClick={() => {
              this.openModel2(item, this.state.classchapter[index].ChapterId)
            }}
          >
            <Icon type="plus" />Add Course Quiz
          </Button>
          <List
            bordered
            dataSource={item.contain}
            renderItem={item => (
              <Card key={index} type="inner" title={item.title} style={{ marginTop: '18px' }}>
                {item.Answer ? (
                  <div>
                    {item.Answer.map(this.renderThing)}
                    <Button
                      onClick={() => {
                        this.handleSubmit()
                    }}
                    > <Icon type="plus" />
                    Add answer
                  </Button>
                  </div>
               
                  ) : (
                  <div>
                    <p>No Question</p>
                    <AnswerUpdate 
                      type="danger"
                      name="EditAnswer"
                      way="AddNew"
                      AnswerId={item.AnswerId}
                      CourseId={this.props.CourseId}
                      ChapterId={this.state.classchapter[index].ChapterId}
                      handleChange={this.handleChange}
                    />
                  </div>
                 
                )}
              </Card>
            )}
          />
      </Card>  
       ))
    // Parse Children arrray but don't use
    // const ClassQuiz = this.state.classquiz.map((item, index) => (
    //   <Card key={index} type="inner" title={item.QuizContent} style={{ marginTop: '18px' }}>
    //       <li key={index}>{item.Answer[0].AnswerContent}</li>
    //   </Card>  
    //   ))
    return (
      <div>
        <ButtonGroup>
          <Button
            onClick={() => {
              this.openModel()
            }}
          >
            <Icon type="plus" />Add Course Chapter
          </Button>
        </ButtonGroup>
        <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <Icon type="edit" />Edit Section
                </span>
              }
              key="1"
            >
             {ClassList}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="edit" />Edit Question
                </span>
              }
              key="2"
            >
              {ClassQuiz}
            </TabPane>
        </Tabs>
        
        <Modal
          title="Add new chapter"
          visible={this.state.visible}
          closable={false}
          footer={[
            <Button key="backone" onClick={this.handleCancel.bind(this)}>
              Close
            </Button>,
            <Button key="asdasd" type="primary" onClick={this.AddChapter.bind(this)}>
              Add Chapter
            </Button>
          ]}
        >
          <Row>
            <Col
              span={4}
              style={{
                lineHeight: '32px',
                textAlign: 'center'
              }}
            >
            Name ：
            </Col>
            <Col span={20}>
              <Input
                placeholder="Chapter name"
                value={this.state.chaptername}
                onChange={e => {
                  this.setState({ chaptername: e.target.value })
                }}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default AddVideoPdf
