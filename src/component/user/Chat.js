import React from 'react';
import axios from "axios";
import { Divider,List } from "antd";
import SubmitChat from "./SubmitChat"


class Chat extends React.Component {
    state = {
        messages: [] 
    }
    initSocket () {
        this.ws = new WebSocket("ws://" + window.location.host + "/ws");
        this.ws.onmessage = (msg) => {
          this.state.messages.push(msg.data);
          this.setState({ messages: this.state.messages });
        }
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    componentWillMount() {
        axios.get("http://localhost:5000/allMessages").then(res => {
            this.setState({
                messages: res.data
           },  { headers: { 'Content-Type': 'application/json',
           //'Content-Type': 'multipart/form-data',
           'Content-Type': 'application/x-www-form-urlencoded'  } })
           console.log("console.log(this.state.messages)"+this.state.messages)
          })
      this.initSocket();
    }
    generateTimestamp () {
        var iso = new Date().toISOString();
        return iso.split("T")[1].split(".")[0];
    }
    sendMessage (message) {
        this.ws.send(
          JSON.stringify({
            username: this.props.user.UserName,
            content: (this.generateTimestamp() + " <" + this.props.user.UserName + "> " + message)
          })
        );
      }
    
    render() {
        return (
            <div>
                <Divider>Chat</Divider>
                <List className="chat-room">
                    {this.state.messages.join('\n')}
                </List>
                <SubmitChat
                placeholder="Let's Talk"
                onSubmit={this.sendMessage.bind(this)} />
            </div>
        )
    }
}

export default Chat;

