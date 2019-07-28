import React from 'react';
import axios from "axios";
import { Input } from 'antd';

const { TextArea } = Input;

class SubmitChat extends React.Component {
    state = {
        messages: []
    };
    initSocket () {
        this.ws = new WebSocket("ws://" + window.location.host + "/ws");
        this.ws.onmessage = (msg) => {
          this.state.messages.push(msg.data);
          this.setState({ messages: this.state.messages });
        }
    }    
    handleOnKeyDown(event) {
        if (event.keyCode === 13 && this.state.value !== "") {
          this.props.onSubmit(this.state.value);
          this.setState({ value: '' });
        }
    }    
    render() {
        return (
            <div>
                <TextArea
                    type="text"
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleOnKeyDown}
                />
            </div>
        )
    }
}

export default SubmitChat;