import React from 'react';
import { Layout } from 'antd';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ClassTypeNav from '../classtypenav/ClassTypeNav';
const { Content } = Layout;

class Classes extends React.Component{
    componentWillMount(){
        this.props.LoadClassType();
    }
    render(){
        const { classtype , header , user , ChangeHeader , Login , Register , LoadClass , classlist , classnum , GetClassNum, SearchItem} = this.props;
        header.currect = ['2'];
        return(
            <Layout className="layout">
                <Header  
                    header={ header } 
                    user={ user } 
                    ChangeHeader = { ChangeHeader } 
                    Login={ Login }
                    Register= {Register}
                    SearchItem={SearchItem}
                />
                    <Content style={{ boxShadow:'0 2px 8px 0 rgba(7,17,27,.06)' }}>
                        <ClassTypeNav classtype={ classtype } LoadClass={ LoadClass } classlist={ classlist } classnum={ classnum }  GetClassNum={GetClassNum}/>
                    </Content>
                <Footer />
            </Layout>
        )
    }
}

export default Classes;