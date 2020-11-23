import React from "react";
import axios from "axios";

export default class Page extends React.Component {
    constructor() {

    }

    createRoom() {
        var roomId = Math.floor(Math.random() * 10000);
        axios.post("localhost/api/createroom", { id: roomId })
            .then(res => {
                if (res.data.success) {
                    var ws = new WebSocket("ws://localhost:8080");
                }
            })
    }

    render() {
        return (
            <div id="HomeWrapper">
                <button class="homeBtn" id="createBtn">Create Room</button>
                <button class="homeBtn" id="joinBtn">Join Room</button>
            </div>
        );
    }
}