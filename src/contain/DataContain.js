import React from 'react';
import BigData from './../component/bigdata/BigData';
import { connect } from 'react-redux'
import { ChangeHeader, Login  , SearchItem} from '../actions';

const DataContain = props=>(<BigData {...props}/>)

const mapStateToProps = state=>({
    header:state.header,
    user:state.user
})

export default connect(mapStateToProps , { ChangeHeader, Login , SearchItem})(DataContain);