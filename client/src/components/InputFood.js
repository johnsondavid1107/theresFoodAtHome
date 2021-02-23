import React, { useState, } from "react"
import API from "../utils/API"


function InputFood(props) {


    const [foodChoice, setFood] = useState();



    function handleInputChange(event) {
        console.log(event.target.value)
        setFood(event.target.value)

    }

    function handleAddFood(event) {
        let combo = {
            user: props.currentUser,
            name: foodChoice,
            dateOfPurchase: null,
            daysFresh: 10,
            spoiled: false,
            location: event.target.value,

        }
        console.log(combo.location)
        API.makeFood(combo).then(function (response) {
            console.log(response)
            window.location.reload(true)
        })
    }




    return (
        <div className="input-group input-group-sm mb-3">
            <input type="text" className="form-control" placeholder="Add food to 😋..." onChange={handleInputChange} />


            <button className="btn btn-warning" style={{ color: "black" }} type="button" onClick={handleAddFood} value="pantry">Pantry</button>
            <button className="btn btn-info" type="button" value="fridge" onClick={handleAddFood}>Fridge</button>
        </div>
    )




}

export default InputFood