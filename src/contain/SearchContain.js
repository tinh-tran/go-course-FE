import React from 'react';
import Search from './../component/search/Search';
import { connect } from 'react-redux'
import { ChangeHeader , Login ,  LoadHotClass, Register} from '../action';

const SearchContain = props=>(<Search {...props}/>)

const mapStateToProps = state=>({
    search:state.search,
    init:state.init,
    header:state.header,
    user:state.user
})

export default connect(mapStateToProps , { ChangeHeader , Login ,  LoadHotClass, Register })(SearchContain);