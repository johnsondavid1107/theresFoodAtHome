import React, { Component } from "react"
import API from "../utils/API"
// Didn't use or touch this, as it was confusing for me to style/ update the page

class PantryCard extends Component {

    state = {
        foodPantry: [],

    };

    componentDidMount() {
        // let idNum = "1";
        // API.getPantryItems(idNum).then(result =>
        //     this.setState({ foodPantry: result.data[0].foodItem.filter(item => item.location === "pantry") })


        // )




    }



    render() {

        let renderFood = this.state.foodPantry
        console.log(renderFood)
        return (
            <div  style={{backgroundColor:"gray"}}>

                <h3 className="align-Header pantry-color">Pantry</h3>



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

export default PantryCard