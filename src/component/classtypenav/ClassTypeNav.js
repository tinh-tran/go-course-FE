import React from 'react';
import axios from 'axios'
import { Layout, Menu, Icon } from 'antd';
import ClassList from '../classlist/ClassList';
const { Content, Sider } = Layout;

class ClassTypeNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            classkey:"1",
        }
        this.ChangeClassType = this.ChangeClassType.bind(this);
    }
    componentWillMount(){
        const info = {
            CategoryID:0,
            Page:1
        }
        console.log("Info 1: " + JSON.stringify(info))
        this.props.LoadClass(info); 
        this.props.GetClassNum(0);
    }
    ChangeClassType(item){     
        let currectList = this.props.classtype.find(v=>(
            v.CategoryID === parseInt(item.key,10)
        ))
        if(!currectList){
            this.props.GetClassNum(0);
            let info = {
                CategoryID:0,
                Page:this.props.classlist.Page
            }  
            //console.log("info :"+JSON.stringify(info))
            this.props.LoadClass(info);
        }else{
            this.props.GetClassNum(currectList.CategoryID);
            let info = {
                CategoryID:currectList.CategoryID,
                Page:this.props.classlist.Page
            }
            this.props.LoadClass(info);
        }
      
    }
    render() {
      
        const { classtype , classlist , LoadClass ,classnum , GetClassNum} = this.props;
        const menuItemLeft = classtype.map(v =>(
            <Menu.Item key={v.CategoryID}><Icon type={v.icon} />{v.CategoryName}</Menu.Item>
        ))
        return (
            <Layout>
                <Content style={{ padding: '50px 70px 20px 70px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['0']}
                                onClick={item=>this.ChangeClassType(item)}
                            >
                                <Menu.Item key="0"><Icon type="appstore-o" />ALL</Menu.Item>
                               { menuItemLeft }   
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <ClassList classnum={ classnum }  classtype={ classtype } classlist={ classlist } LoadClass={LoadClass} GetClassNum={GetClassNum}/>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

export default ClassTypeNav;