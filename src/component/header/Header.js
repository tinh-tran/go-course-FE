import React from 'react';
import { Layout, Menu, Input, Row, Col, Button, Icon, Avatar, Popconfirm , Modal, Form, message } from 'antd';
import { withRouter } from 'react-router-dom';
import './header.css';
import Logo from '../logo/Logo';
import ShoppingCart from '../cart/ShoppingCart'

const { Header } = Layout;
const Search = Input.Search;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

function logout() {
    let mylocal =  localStorage
    mylocal.clear('persist:s3corp.com.vn')
    window.location.reload()
}

class CommonHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            cfpassword:'',
            visible: false,
            drawvisible: false,
            registervisible:false
        }
        this.register= this.register.bind(this);
        this.showModel = this.showModel.bind(this);
        this.login = this.login.bind(this);
        this.MenuClick = this.MenuClick.bind(this);
        this.modelCancel = this.modelCancel.bind(this);
        this.toUser = this.toUser.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.showRegisterModel = this.showRegisterModel.bind(this);
        this.registermodelCancel = this.registermodelCancel.bind(this);
    }
    searchItem(v){
        this.props.SearchItem(v);
        this.props.history.push('/search');
    }
    modelCancel() {
        this.setState({
            visible: false
        });
    }
    showModel() {
        this.setState({
            visible: true
        });
    }
    showRegisterModel() {
        this.setState({
            registervisible: true
        });
    }
    registermodelCancel() {
        this.setState({
            registervisible: false
        });
    }
    showDrawer = () => {
        this.setState({
            drawvisible: true,
        });
      };
    onClose = () => {
        this.setState({
          drawvisible: false,
        });
      };
    login() {
      const userinfo= {
        username : this.state.username,
        password: this.state.password
      }
     // console.log(JSON.stringify(userinfo))
        this.props.Login(userinfo);    
        this.setState({
            visible: false,
        })
    }
    register() {
        if ( this.state.password === this.state.cfpassword)
        {
            const userinfo= {
                username : this.state.username,
                password: this.state.password,
                role : 2 
              }  
                this.props.Register(userinfo);    
                this.setState({
                    registervisible: false,
            })
        } else{ 
            message.error('Confirm password incorrect');
        }
        
      }
    MenuClick(key) {
        switch (key) {
            case '1':
                this.props.ChangeHeader(['1']);
                this.props.history.push('/');
                break;
            case '2':
                this.props.ChangeHeader(['2']);
                this.props.history.push('/class');
                break;
            case '3':
                this.props.ChangeHeader(['3']);
                this.props.history.push('/bigdata');
                break;
            default:
                return null;
        }
    }
    toUser(){
        this.props.ChangeHeader(['']);
        this.props.history.push('/user')
    }
    render() {
        const suffix = this.state.username ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const psuffix = this.state.password ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const loginTitle = (<div style={{ textAlign: 'center' }}>Login</div>)
        const registerTitle = (<div style={{ textAlign: 'center' }}>Register</div>)
        return (
            <Header>
                <Row gutter={16}>
                    <Col span={6}>
                        <div className="logo" >
                            <Logo />
                        </div>
                    </Col>
                    <Col span={10} style={{ textAlign: 'center' }}>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={this.props.header.currect}
                            style={{ lineHeight: '64px', display: 'inline-block' }}
                            onClick={item => this.MenuClick(item.key)}
                        >
                            <Menu.Item key="1" onClick={this.tohome}><Icon type="home" />Home</Menu.Item>
                            {/* <Menu.Item key="2" onClick={this.toclass}><Icon type="book" />ListCourse</Menu.Item>
                            <Menu.Item key="3" onClick={this.tobigdata}><Icon type="dot-chart" />BigData</Menu.Item>
                            <SubMenu title={'Support'}>
                                <Menu.Item key="4"><Icon type="android" />Android</Menu.Item>
                                <Menu.Item key="5"><Icon type="apple" />Apple</Menu.Item>
                            </SubMenu> */}
                        </Menu>
                    </Col>
                    <Col span={4}>
                        <Search
                            placeholder="Searching...."
                            onSearch={v => this.searchItem(v)}
                            enterButton
                        />
                    </Col>
                    <Col span={4} style={{ textAlign: 'center' }}>
                        {!this.props.user.isAuth ?
                            
                            <ButtonGroup style={{ display: 'inline-block' }}>
                                <Button type="primary" icon="user" onClick={this.showModel}>Login</Button>
                                <Button type="primary" icon="user" onClick={this.showRegisterModel}>Register</Button>
                            </ButtonGroup>
                            :
                            <span>
                                <span key="left" style={{ marginRight: 24,cursor:'pointer' }}>
                                    <ShoppingCart user={this.props.user}/>
                                </span>
                                <span key="center" style={{ marginRight: 24,cursor:'pointer' }} onClick={this.toUser}>
                                    <Avatar shape="square" src={ this.props.user.userphoto || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  } />
                                </span>
                                <span key="right">
                                    <Popconfirm title="Confirm?" okText="Ok" cancelText="Cancel" onConfirm={logout}>
                                        <a href="#">Logout</a>
                                    </Popconfirm>
                                </span>
                            </span>
                        }
                        <Modal
                            title={loginTitle}
                            okText="Ok"
                            cancelText="Cancel"
                            visible={this.state.visible}
                            onOk={this.login}
                            wrapClassName="vertical-center-modal"
                            onCancel={this.modelCancel}
                        >
                            <Form>
                                <FormItem>
                                    <Input
                                        placeholder="UserName"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={suffix}
                                        value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Input
                                        placeholder="PassWord"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={psuffix}
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type="password"
                                    />
                                </FormItem>
                            </Form>
                        </Modal>
                        <Modal
                            title={registerTitle}
                            okText="Ok"
                            cancelText="Cancel"
                            visible={this.state.registervisible}
                            onOk={this.register}
                            wrapClassName="vertical-center-modal"
                            onCancel={this.registermodelCancel}
                        >
                            <Form>
                                <FormItem>
                                    <Input
                                        placeholder="UserName"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={suffix}
                                        value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Input
                                        placeholder="PassWord"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={psuffix}
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type="password"
                                    />
                                </FormItem>
                                <FormItem>
                                    <Input
                                        placeholder="Confirm PassWord"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={psuffix}
                                        value={this.state.cfpassword}
                                        onChange={e => this.setState({ cfpassword: e.target.value })}
                                        type="password"
                                    />
                                </FormItem>
                            </Form>
                        </Modal>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default withRouter(CommonHeader);