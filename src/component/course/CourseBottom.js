import React from 'react'
import VideoPlayer from '../videoplayer/VideoPlayer'
import { Tabs, Icon, Row, Col, Card, List, Button, message, Modal } from 'antd'
import axios from 'axios'
const TabPane = Tabs.TabPane
const ButtonGroup = Button.Group

class CourseBottom extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.props = nextProps
  }
  state = {
    videoVisible: false,
    pdfVisible: false,
    Pdf: '',
    videoJsOptions: {
      autoplay: true,
      controls: true,
      fluid: true,
      playbackRates: [0.75, 1, 1.5, 2],
      sources: [
        {
          src: '',
          type: 'video/mp4'
        }
      ]
    }
  }
  seeClass(video, pdf, CourseSectionId) {
    axios
      .post('/api/course/seeclass', {
        Video: video,
        Pdf: pdf,
        CourseId: this.props.classinfo.CourseId,
        SectionId: CourseSectionId,
        UserId: this.props.user.UserId
      },{ headers: { 'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/x-www-form-urlencoded' }})
      .then(res => {
        message.success('Register Success')
        this.props.handleAdd()
      })
  }
  CloseVideo() {
    this.setState({ videoVisible: false })
  }
  ClosePdf() {
    this.setState({ pdfVisible: false })
  }
  PlayVideo(video, CourseSectionId) {
    this.seeClass(video, '', CourseSectionId)
    this.setState({
      videoVisible: true,
      videoJsOptions: {
        autoplay: true,
        controls: true,
        fluid: true,
        playbackRates: [0.75, 1, 1.5, 2],
        sources: [
          {
            src: video,
            type: 'video/mp4'
          }
        ]
      }
    })
  }
  PlayPdf(Pdf, CourseSectionId) {
    this.seeClass('', Pdf, CourseSectionId)
    this.setState({
      pdfVisible: true,
      Pdf: Pdf
    })
  }
  render() {
    const { courseInfo, isSelect } = this.props
    const TestList = (
      <div style={{ background: '#ECECEC', padding: '50px', textAlign: 'center' }}>
        <Button type="primary" icon="form" size="large">
          Click To Start Test
        </Button>
      </div>
    )
    const ClassList = courseInfo.map((item, index) => (
      <Card key={index} type="inner" title={item.title} style={{ marginTop: '18px' }}>
        <List
          bordered
          dataSource={item.contain}
          renderItem={item => (
            <List.Item>
              {item.title}
              <ButtonGroup>
                {item.SectionVideo ? (
                  <Button
                    type="primary"
                    icon="play-circle"
                    onClick={() =>
                    isSelect ? this.PlayVideo(item.SectionVideo, item.CourseSectionId) : message.error('Enroll!!!', 0.5)
                    }
                  />
                ) : null}
                {item.SectionPdf ? (
                  <Button
                    type="primary"
                    icon="file-pdf"
                    onClick={() =>
                    isSelect ? this.PlayPdf(item.SectionPdf, item.CourseSectionId) : message.error('Enroll!!!', 0.5)
                    }
                  />
                ) : null}
              </ButtonGroup>
            </List.Item>
          )}
        />
      </Card>
    ))
    return (
      <Row>
        <Col span={18}>
          <Tabs defaultActiveKey="1" size="large">
            <TabPane
              tab={
                <span>
                  <Icon type="folder" />Folder
                </span>
              }
              key="1"
            >
              {ClassList}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="copy" />Start Test
                </span>
              }
              key="2"
            >
              {TestList}
            </TabPane>
          </Tabs>
        </Col>
        <Col span={6} />
        <Modal
          className="VideoPlayer"
          title={<div style={{ textAlign: 'center' }}>Course Video</div>}
          wrapClassName="vertical-center-modal"
          visible={this.state.videoVisible}
          mask={false}
          footer={null}
          maskClosable={false}
          destroyOnClose={true}
          bodyStyle={{
            padding: '5px'
          }}
          onCancel={this.CloseVideo.bind(this)}
        >
        <VideoPlayer {...this.state.videoJsOptions} />
        </Modal>
        <Modal
          className="PdfPlayer"
          title={<div style={{ textAlign: 'center' }}>PDF</div>}
          wrapClassName="vertical-center-modal"
          visible={this.state.pdfVisible}
          onCancel={this.ClosePdf.bind(this)}
          maskClosable={false}
          destroyOnClose={true}
          mask={false}
          bodyStyle={{
            padding: '5px'
          }}
          footer={null}
        >
          <embed src={this.state.Pdf} width="100%" height="466px" className="pdfPlayer" />
        </Modal>
      </Row>
    )
  }
}

export default CourseBottom
