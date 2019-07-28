import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class CommonFooter extends React.Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                S3Corp ©2018 Created By GoLangTeam
            </Footer>
        )
    }
}

export default CommonFooter;