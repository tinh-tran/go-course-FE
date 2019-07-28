import React from 'react';
import { Form, Input, Button, Alert, Upload, Icon, Modal } from 'antd';
const FormItem = Form.Item;

class UserInfo extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: this.props.user.CustomerPhoto,
        }],
        userid: this.props.user.UserId,
        username: this.props.user.UserName,
        displayname: this.props.user.DisplayName,
        password: '',
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handleChange = ({ fileList }) => {
        this.props.RestartUser(this.props.user.UserId);
        this.setState({ fileList })
    }
    ChangeValue(v, name) {
        this.setState({
            [name]: v.target.value
        })
    }
    handleSubmit = () => {
        this.props.ChangeUserInfo({ password: this.state.password, DisplayName: this.state.DisplayName, CustomerId: this.state.CustomerId })
    }
    render() {
        const { user } = this.props;
        console.log(user)
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Alert
                    message={`User Info : ` + this.props.user.Role}
                    description={this.props.user.belong}
                    type="info"
                    showIcon
                />
                <br />
                <div className="clearfix">
                    <span style={{ fontSize: '14px', lineHeight: '40px', color: 'rgba(0, 0, 0, 0.85)' }}>Upload Avatar：</span>
                    <Upload
                        action={"/api/user/photo?userid=" + user.UserId}
                        listType="picture-card"
                        fileList={fileList}
                        accept='image/*'
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 2 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
                <Form >
                    <FormItem
                        label="UserName"
                    >
                        <Input placeholder="UserName" value={this.state.username} onChange={v => this.ChangeValue(v, 'username')} disabled />
                    </FormItem>
                    <FormItem
                        label="Password"
                    >
                        <Input placeholder="Password" value={this.state.password} onChange={v => this.ChangeValue(v, 'password')} />
                    </FormItem>
                    <FormItem
                        label="DisplayName"
                    >
                        <Input placeholder="DisplayName" value={this.state.displayname} onChange={v => this.ChangeValue(v, 'displayname')} />
                    </FormItem>
                    <FormItem >
                        <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default UserInfo;