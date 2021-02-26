import React, { Component } from "react"
import API from "../utils/API"


class FridgeCard extends Component {


    state = {
        foodFridge: [],
        user: '',
        idNumber: ""
    };

    componentDidMount() {
        this.setState({ user: this.props.currentUser });

        let idNum = this.props.currentUser;
        this.setState({idNumber: this.props.currentUser});
        API.getFoods(idNum).then(result => {
            if (result.data[0] === undefined) {
                this.setState({ foodFridge: "No food found" })
            } else {
                this.setState({ foodFridge: result.data[0].foodItem.filter(item => item.location === "fridge") })
            }
        })




    }

    handleDelete(event, idNum) {
        event.preventDefault();


        let deleteChoice = {
            //need to actually add user that is logged in
            user: idNum,
            deleteFood: event.target.value
        }


        API.deleteFood(deleteChoice)
            .then(function (response) {
                console.log(response)

            })

        window.location.reload(true);
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
                            <button className="btn btn-danger" type="button" onClick={(e) =>this.handleDelete(e, this.state.idNumber)}  value={item._id}>Delete</button>
                            <button className="btn btn-danger" type="button" >Renew</button>

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