import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Teacher from './teacher/Teacher';
import Admin from './admin/Admin'
import Student from './student/Student'
import { Layout } from 'antd';
const { Content } = Layout;


class UserBox extends React.Component {
    render() {
        const { header, user, ChangeHeader, Login, Register, SearchItem, RestartUser, ChangeUserInfo, hotclass, indeximg, GET_MYCLASS} = this.props;
        header.currect = [''];
        const { Role } = user;
        return (
            <Layout className="layout">
                 <Header 
                    header={header}
                    user={user}
                    ChangeHeader={ChangeHeader}
                    Login={Login}
                    Register = {Register}
                    SearchItem={SearchItem} />
                <Content style={{ boxShadow: '0 2px 8px 0 rgba(7,17,27,.06)', padding: '25px 50px' }}>
                    <div style={{ background: '#fff', boxShadow: '0 2px 8px 0 rgba(7,17,27,.66)' }}>
                        { 
                                (Role === 'user') ? // teacher
                                    <Teacher user={user} RestartUser={RestartUser} ChangeUserInfo={ChangeUserInfo} GET_MYCLASS={GET_MYCLASS} />
                                        : (Role === 'admin') ?
                                            <Admin user={user} hotclass={hotclass} RestartUser={RestartUser} ChangeUserInfo={ChangeUserInfo} indeximg={indeximg} />
                                            : (Role ==='student') ?
                                                <Student user={user} hotclass={hotclass} RestartUser={RestartUser} ChangeUserInfo={ChangeUserInfo} GET_MYCLASS={GET_MYCLASS} />
                                            : this.props.history.push('/') 
                        }
                    </div>
                </Content>
                <Footer />
            </Layout>
        )
    }
}


export default withRouter(UserBox);