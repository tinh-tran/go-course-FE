import React from 'react';
import axios from "axios";
import { Table, Button, Alert } from "antd";

const { Column } = Table;

class SeeStudents extends React.Component {
    state = {
        myclass: [],
        StudentJoined: "A total of 0 students have chosen your course!"
    };
    SeeStudent(CourseId) {
        console.log(CourseId);
    }
    GiveScore(CourseId) {
        console.log(CourseId);
    }
    componentWillMount() {
        axios
            .post("/api/course/createid", { CreateId: this.props.user.UserId },{ headers: { 'Content-Type': 'application/json',
            //'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/x-www-form-urlencoded' }} )
            .then(
                res => {
                    let arr = [];
                    let studentnumber = 0;
                    res.data.filter(v =>
                        v.Status 
                    ).map((v, index) => {
                        let obj = {};
                        obj.key = index + 1;
                        obj.CourseId = v.CourseId;
                        obj.CourseName = v.CourseName;
                        obj.StudentJoined = v.StudentJoined;
                        studentnumber += v.StudentJoined;
                        obj.type = v.type;
                        arr.push(obj);
                        return null;
                    });
                    this.setState({
                        myclass: arr,
                        StudentJoined: `Have ${studentnumber}Join Course`
                    })
                }
            )
    }
    render() {
        return (
            <div>
                <Alert message={this.state.StudentJoined} type="success" />
                <br />
                <Table dataSource={this.state.myclass} bordered>
                    <Column title="CourseID" dataIndex="CourseId" key="CourseId" />
                    <Column
                        title="Course Name"
                        dataIndex="CourseName"
                        key="CourseName"
                    />
                    <Column title="Category Id" dataIndex="CategoryID" key="CategoryID" />
                    <Column
                        title="StudentJoined"
                        dataIndex="StudentJoined"
                        key="StudentJoined"
                    />
                    <Column
                        title="Active"
                        key="action"
                        render={text => (
                            <span>
                                <Button.Group>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.SeeStudent(text.CourseId);
                                        }}
                                    >
                                        Select Student
                                    </Button>
                                    <Button
                                        type="danger"
                                        onClick={() => {
                                            this.GiveScore(text.CourseId);
                                        }}
                                    >
                                        Give Score
                                    </Button>
                                </Button.Group>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}

export default SeeStudents;