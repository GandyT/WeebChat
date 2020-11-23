import React from "react";
import utils from "../../socketmanager.js";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatHistory: [],
            inputMsg: "",
            roomId: "NULL",
        }
    }

    componentDidMount = () => {
        const ws = new WebSocket("ws://localhost:8080/websocket");

        ws.onopen = () => {
            utils.joinRoom(ws);
            utils.addSocket(ws);
            this.setState({ roomId: utils.getRoomId() });
        }
        ws.onmessage = payload => {
            var data = JSON.parse(payload.data);

            var op = data.op;
            if (op == 2) {
                this.setState({ chatHistory: data.chatHistory });
            } else if (op == 3) {
                this.setState({ chatHistory: [...this.state.chatHistory, data.content] })
            }
        };
        ws.onerror = err => {
            console.log(err);
        }
    }

    renderChat = () => {
        var messages = [];
        this.state.chatHistory.forEach((msg, i) => {
            messages.push(
                <div className="chatMessage" key={i}>{msg}</div>
            )
        });
        return messages;
    }

    sendMessage = () => {
        var msg = this.state.inputMsg;
        utils.sendMessage(msg);
        this.setState({
            chatHistory: [...this.state.chatHistory, msg],
            inputMsg: ""
        })
    }

    render = () => {
        return (
            <div id="chatPageWrapper">
                <div id="chatHeader">
                    Room ID: {this.state.roomId}
                </div>
                <div id="chatWrapper">
                    {this.renderChat()}
                </div>
                <div id="inputWrapper">
                    <input id="chatInput" type="text" value={this.state.inputMsg} onChange={(e) => {
                        this.setState({ inputMsg: e.target.value })
                    }} />
                    <button id="sendBtn" onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        )
    }
}