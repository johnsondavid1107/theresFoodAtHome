import React, { Component } from "react"
import API from "../utils/API"

class InputFood extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        let user = this.props.currentUser
        console.log(user, "line12")
    }


    render() {

        return (
            <div className="input-group input-group-sm mb-3">
                <input type="text" className="form-control" placeholder="Add food to 😋..." />


                <button className="btn btn-warning" style={{ color: "black" }} type="button">Pantry</button>
                <button className="btn btn-info" type="button">Fridge</button>
            </div>
        )



    }
}

export default InputFood