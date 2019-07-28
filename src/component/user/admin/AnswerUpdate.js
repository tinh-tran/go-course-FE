import React from 'react'
import axios from 'axios'
import { Row, Col, Button, Input, Divider, Upload, message, Icon } from 'antd'
import swal from 'sweetalert2'
import {QuizApi} from '../../../config'

class AnswerUpdate extends React.Component {
  state = {
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps
  }
  
  handleSubmit(){
    swal({
        title: 'Add Quiz title',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit'
      }).then(res => {
        axios
          .post(QuizApi+'/api/answer', {
            ChapterId: this.props.ChapterId,
            CourseId: this.props.CourseId,
            AnswerContent: res.value,
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
   
  render() {
    return (
      <div style={{ display: 'inline' }}>
        {this.props.AnswerId ? (
            <Button type={this.props.type}>
              <Icon type="edit" /> Edit
            </Button>
            ) : (
          <Button
            onClick={() => {
              this.handleSubmit()
            }}
            > <Icon type="plus" />
            Add answer
          </Button>
        )}
      </div>
    )
  }
}

export default AnswerUpdate
