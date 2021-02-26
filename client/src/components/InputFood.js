import React, { useState, useEffect } from "react"
import API from "../utils/API"
import { Col, Row } from "../components/Grid"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


function InputFood(props) {


    const [foodChoice, setFood] = useState();
    const [allFoods, setAllFoods] = useState();
    const [searchFoods, setSearchFoods] = useState();
    const [placeHolderFood, setPlaceHolderFood] = useState()
    const [inputVal, setInputVal] = useState();
    const [daysFresh, setDaysFresh] = useState(0);

    useEffect(() => {
        //bring the entire databse allFOod collection down and set it as state.  Then search that state for event.target.value of user input.  If found render in placeholder.  If no match, take value and send up copy to the all foods database with the shelflife
        API.getAllFoods().then(function (response) {
            console.log(response.data[0].allFoods)
            setAllFoods(response.data[0].allFoods)



        })

        console.log(placeHolderFood)

    }, [])



    function handleInputChange(event) {
        const { value } = event.target
        console.log(value)
        setFood(value)

        //for the all foods search
        setSearchFoods(value)
        console.log(searchFoods)

        setPlaceHolderFood(allFoods.filter(option =>
            option.name.toLowerCase().includes(value))
        )
        console.log(placeHolderFood)


        setInputVal(value)
        console.log(inputVal)


    }

    function handleAddFood(event) {
        let combo = {
            user: props.currentUser,
            name: foodChoice,
            dateOfPurchase: null,
            daysFresh: daysFresh,
            spoiled: false,
            location: event.target.value,

        }
        console.log(combo.location)
        API.makeFood(combo).then(function (response) {
            console.log(response)
            window.location.reload(true)
        });
        API.checkAllFoods(foodChoice).then(function (response2) {
            console.log(response2)
        })
    }


    if (placeHolderFood === undefined || inputVal === "") {
        var nada = "Nothing searched yet"
    } else {
        var renderSearch = placeHolderFood.map((item, index) =>
            <div key={index}>
                <button className="btn btn-outline-success" type="button">{item.name}</button>
            </div>
        )

    }

    const handleDayChange = date => {
        date = JSON.stringify(date);

        let monthString = date[6] + date[7];
        let dayString = date[9] + date[10];
        let yearString = date[1] + date[2] + date[3] + date[4];
        let dateString = `${monthString}/${dayString}/${yearString}`;

        let date1 = new Date(dateString)
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        let daysFreshNum = Math.floor((new Date(date1) - new Date(today)) / (1000 * 3600 * 24));

        setDaysFresh(daysFreshNum);


    }


    return (
        <div>
            <Row>
                <Col size="md-12">
                    <div className="input-group input-group-sm mb-3">
                        <input type="text" className="form-control" placeholder="Add food to 😋..." onChange={handleInputChange} />


                        <button className="btn btn-warning" style={{ color: "black" }} type="button" onClick={handleAddFood} value="pantry">Pantry</button>
                        <button className="btn btn-info" type="button" value="fridge" onClick={handleAddFood}>Fridge</button>

                    </div>
                </Col>
            </Row>
            <Row>
                <Col size="md-12">

                    {/* Added Hever's food expiration date selection react code into Pantry page - Zo */}
                    <div style={{ float: "right" }}>
                        <p>Please type a day:</p>
                        <DayPickerInput onDayChange={handleDayChange} />
                    </div>

                    <h4>Search Suggestions: </h4>

                    {nada || renderSearch}
                </Col>
            </Row>
        </div>
    )




}

export default InputFood