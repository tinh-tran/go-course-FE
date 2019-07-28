import React from 'react';
import Classes from './../component/classes/Classes';
import { connect } from 'react-redux'
import { ChangeHeader , LoadClassType , LoadClass ,GetClassNum, SearchItem, Login, Register} from '../actions';


const ClassContain = props=>(<Classes {...props}/>)

const mapStateToProps = state=>({
    classnum:state.classnum,
    classlist:state.classlist,
    classtype:state.init.classtype,
    header:state.header,
    user:state.user
})

export default connect(mapStateToProps , { ChangeHeader, Login , LoadClassType , LoadClass ,GetClassNum, SearchItem, Register})(ClassContain);