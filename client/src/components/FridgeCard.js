import React, { Component } from "react"
import API from "../utils/API"


class FridgeCard extends Component {


    state = {
        foodFridge: [],
        user: ''
    };

    componentDidMount() {
        this.setState({ user: this.props.currentUser })

        let idNum = this.props.currentUser
        API.getFoods(idNum).then(result => {
            if (result.data[0] === undefined) {
                this.setState({ foodFridge: "No food found" })
            } else {
                this.setState({ foodFridge: result.data[0].foodItem.filter(item => item.location === "fridge") })
            }
        })




    }

    handleDelete(event) {


        let deleteChoice = {
            //need to actually add user that is logged in
            user: "NT3fCMjxFfPemnQqfs9u0OIoWHB3",
            deleteFood: event.target.value
        }


        console.log(event.target.value)
        API.deleteFood(deleteChoice)
            .then(function (response) {
                console.log(response)

            })

        window.location.reload(true)
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



                {noFood ||

                    renderFood.map((item, index) =>
                        <div key={index}>
                            <button className="btn btn-danger" type="button" onClick={this.handleDelete} value={item._id}>Delete</button>

                            <div className="card">
                                <div className="card-body">
                                    {item.name}
                                </div>
                            </div>


                            <br />
                        </div>
                    )

                }



            </div >

        )
    }
}

export default FridgeCard