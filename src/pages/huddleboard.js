import React, { Component } from 'react'
import firebase from 'firebase'
import { DB_CONFIG } from '../util/config'


export class huddleboard extends Component {
    constructor() {
        super();

        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('speed4');

        this.state = {
            speed: 10
        }
    }

    componentDidMount() {
        this.database.on('value', snap => {
            console.log("SNAPSHOT :: " + snap.val())
            // this.setState({
            //     speed: snap.val()
            // })
        })
    }

    render() {
        return (
            <div>
                <h1>The speed is {this.state.speed}</h1>
            </div>
        )
    }
}

export default huddleboard
