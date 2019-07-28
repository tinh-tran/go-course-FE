import React from 'react';
import UserBox from '../component/user/UserBox';
import { connect } from 'react-redux';
import { ChangeHeader, SearchItem, RestartUser, ChangeUserInfo, GET_MYCLASS } from '../actions';
import {Login,isUserAuthen,logOutUser} from '../actions/sessionActions';


const UserContain = props => (<UserBox {...props} />)

const mapStateToProps = state => ({
    indeximg: state.indeximg,
    hotclass: state.init.hotclass,
    header: state.header,
    user: state.user
})

export default connect(mapStateToProps, { ChangeHeader, Login, SearchItem, RestartUser, ChangeUserInfo, GET_MYCLASS, isUserAuthen, logOutUser })(UserContain);