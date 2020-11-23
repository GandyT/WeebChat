import React from "react";
import axios from "axios";
import utils from "../../socketmanager.js";
import "./component.css";
import { Redirect } from "react-router-dom";

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            joinid: "",
            redirect: false,
        }
    }

    createRoom = () => {
        var roomId = Math.floor(Math.random() * 10000);
        axios.post("api/createroom", { id: roomId })
            .then(res => {
                if (res.data.success) {
                    utils.setRoomId(roomId);
                    this.setState({ redirect: true })
                }
            })
    }

    joinRoom = () => {
        utils.setRoomId(this.state.joinid);
        this.setState({ redirect: true })
    }

    handleInput = (e) => {
        if (isNaN(e.target.value)) return;
        this.setState({ joinid: e.target.value })
    }

    redirect = () => {
        if (this.state.redirect)
            return <Redirect to="/room" />
    }

    render() {
        return (
            <div id="HomeWrapper">
                {this.redirect()}
                <h1>
                    <b>WeebChat</b>
                </h1>
                <div id="HomeBtnWrapper">
                    <button className="homeBtn" id="createBtn" onClick={this.createRoom}>Create Room</button>
                    <div id="JoinBtnWrapper">
                        <input type="text" onChange={this.handleInput} value={this.state.joinid} />
                        <button className="homeBtn" id="joinBtn" onClick={this.joinRoom}>Join Room</button>
                    </div>
                </div>
            </div>
        );
    }
}