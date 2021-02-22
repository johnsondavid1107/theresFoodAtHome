import React, { Component } from "react"
import API from "../utils/API"
// Didn't use or touch this, as it was confusing for me to style/ update the page

class FridgeCard extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        foodFridge: []
    };

    componentDidMount() {

        let idNum = this.props.currentUser;
        API.getPantryItems(idNum).then(result => {
            console.log(result);
            this.setState({ foodFridge: result.data[0].foodItem.filter(item => item.location === "fridge") })
        }

        )



    }



    render() {

        let renderFood = this.state.foodFridge
        console.log(renderFood)
        return (
            <div>

                <h3 className="align-Header">Fridge</h3>



                {renderFood.map(item =>
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