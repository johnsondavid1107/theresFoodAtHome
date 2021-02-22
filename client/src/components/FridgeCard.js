import React, { Component } from "react"
import API from "../utils/API"


class FridgeCard extends Component {


    state = {
        foodFridge: []
    };

    componentDidMount() {

        let idNum = this.props.currentUser
        API.getFoods(idNum).then(result => {
            if (result.data[0] === undefined) {
                this.setState({ foodFridge: "No food found" })
            } else {
                this.setState({ foodFridge: result.data[0].foodItem.filter(item => item.location === "fridge") })
            }
        })




    }



    render() {

        let renderFood = this.state.foodFridge
        console.log(renderFood)
        if (renderFood === "No food found") {
            var noFood = "Please add food to list"
        }
        return (
            <div style={{ backgroundColor: "gray" }}>

                <h3 className="align-Header fridge-color">Fridge</h3>



                {<h2>{noFood}</h2> ||

                    renderFood.map(item =>
                        <div>
                            <button className="btn btn-danger" type="button">Delete</button>

                            <div className="card">
                                <div className="card-body">
                                    {item.name}
                                </div>
                            </div>


                            <br />
                        </div>
                    )}



            </div >

        )
    }
}

export default FridgeCard