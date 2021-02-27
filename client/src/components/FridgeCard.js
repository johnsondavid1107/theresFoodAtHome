import React, { Component } from "react"
import API from "../utils/API";
import SuccessAlert from "../components/SuccessAlert";
import DeleteSuccess from "../components/DeleteSuccess";


class FridgeCard extends Component {


    state = {
        foodFridge: [],
        user: '',
        idNumber: "",
        show: false,
        showDelete: false,
        successIndex: 0,
        deleteIndex: 0,
        successName: "",
        deleteName: ""
    };

    componentDidMount() {

        let idNum = this.props.currentUser;
        this.setState({ idNumber: this.props.currentUser });

        API.getFoods(idNum).then(result => {
            if (result.data[0] === undefined) {
                this.setState({ foodPantry: "No food found" })
            } else {
                let foodValues = result.data[0].foodItem.filter(item => item.location === "fridge");
                //Calculate time remaining - categorize it into "fresh", "expiring soon", and "expired"
                //If null date of purchase, set it to one week ago
                let todayDate = new Date();

                todayDate = JSON.stringify(todayDate);
                let monthString = todayDate[6] + todayDate[7];
                let dayString = todayDate[9] + todayDate[10];
                let yearString = todayDate[1] + todayDate[2] + todayDate[3] + todayDate[4];
                todayDate = `${monthString}/${dayString}/${yearString}`;

                let newFoodArray = [];
                for (let i = 0; i < foodValues.length; i++) {
                    // console.log(foodValues[i]);
                    let dateOfPurchase = foodValues[i].dateOfPurchase;

                    //If no date of purchase, make it one week ago
                    if (!dateOfPurchase) {
                        //Set the value to one week ago
                        let oneWeekAgo = new Date();
                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                        oneWeekAgo = JSON.stringify(oneWeekAgo);
                        let monthString = oneWeekAgo[6] + oneWeekAgo[7];
                        let dayString = oneWeekAgo[9] + oneWeekAgo[10];
                        let yearString = oneWeekAgo[1] + oneWeekAgo[2] + oneWeekAgo[3] + oneWeekAgo[4];
                        oneWeekAgo = `${monthString}/${dayString}/${yearString}`;

                        dateOfPurchase = oneWeekAgo;
                    }
                    //Need to figure out the spoil date - take date of purchase and add the number of days fresh
                    let spoilDate = new Date(dateOfPurchase);
                    spoilDate.setDate(spoilDate.getDate() + foodValues[i].daysFresh);
                    spoilDate = JSON.stringify(spoilDate);
                    let monthString = spoilDate[6] + spoilDate[7];
                    let dayString = spoilDate[9] + spoilDate[10];
                    let yearString = spoilDate[1] + spoilDate[2] + spoilDate[3] + spoilDate[4];
                    spoilDate = `${monthString}/${dayString}/${yearString}`;


                    //Now to categorize foods into amount of time remaining
                    let total = Math.floor((new Date(spoilDate) - new Date(dateOfPurchase)) / (1000 * 3600 * 24));
                    total = total + foodValues[i].daysFresh;
                    console.log(total);


                    //Give classnames based on total time remaining
                    let timeColor;
                    if (total >= 0 && total < 7) {
                        //ORANGE
                        timeColor = "#FAC002";
                    } else if (total < 0) {
                        //RED
                        timeColor = "#E31009";
                    } else {
                        //Green
                        timeColor = "#59F56B"
                    }
                    let newObject = {
                        _id: foodValues[i]._id,
                        dateOfPurchase: dateOfPurchase,
                        daysFresh: foodValues[i].daysFresh,
                        location: foodValues[i].location,
                        name: foodValues[i].name,
                        timeColor: timeColor,
                        timeRemaining: total
                    }

                    newFoodArray.push(newObject);

                }
                // this.setState({ foodPantry: result.data[0].foodItem.filter(item => item.location === "pantry") });
                this.setState({ foodFridge: newFoodArray })

            }
        });

    }

    handleDelete(event, idNum) {
        event.preventDefault();


        let deleteChoice = {
            //need to actually add user that is logged in
            user: idNum,
            deleteFood: event.target.value
        }



        this.setState({deleteName: event.target.name});
        this.setState({showDelete: true});

        API.deleteFood(deleteChoice)
            .then(function (response) {
                console.log(response)

            })

        window.location.reload(true);
    }


    handleUpdate(event, idNumber) {
        event.preventDefault();

        let foodName = event.target.value;

        this.setState({successName: foodName});
        this.setState({successType: "success"});
        this.setState({show: true});
        //Need the ID and the foodname
        //THIS WILL NOT WORK UNTIL WE'VE FIXED THE CALENDAR SITUATION
        API.updateFood(idNumber, foodName)
            .then(response => console.log(response))
            .catch(err => console.log(err));

        window.location.reload(true);
    }

    render() {

        let renderFood = this.state.foodFridge;
        // console.log(renderFood)
        if (renderFood === "No food found") {
            var noFood = "Please add food to list"
        }
        return (
            <div style={{ backgroundColor: "gray" }}>

                <h3 className="align-Header fridge-color">Fridge</h3>
                <DeleteSuccess show={this.state.showDelete} index={this.state.deleteIndex} name={this.state.deleteName} />
                <SuccessAlert show={this.state.show} index={this.state.successIndex} name={this.state.successName} />
                {noFood ||

                    renderFood.map((item, index) =>
                        <div>
                            <div key={index}>
                                <button className="btn btn-danger" type="button" onClick={(e) => this.handleDelete(e, this.state.idNumber)} value={item._id} name={item.name}>Delete</button>
                                <button className="btn btn-success" type="button" onClick={(e) => this.handleUpdate(e, this.state.idNumber)} value={item.name}>Renew</button>

                                <div className="card">
                                    <div className="card-body" style={{ border: `${item.timeColor} 5px solid`, }}>
                                        {item.name}
                                    </div>
                                </div>


                                <br />
                            </div>
                        </div>
                    )

                }

            </div >

        )
    }
}

export default FridgeCard

