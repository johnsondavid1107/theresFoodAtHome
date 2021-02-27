import React, { useState, useEffect } from "react"
import API from "../utils/API"
import { Col, Container, Row } from "../components/Grid"
// Added new imports to make calender work on page for food expiration - Zo/Hever
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';



function InputFood(props) {


    const [foodChoice, setFood] = useState();
    const [allFoods, setAllFoods] = useState();
    const [searchFoods, setSearchFoods] = useState();
    const [placeHolderFood, setPlaceHolderFood] = useState()
    const [inputVal, setInputVal] = useState();

    useEffect(() => 
    {
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
            daysFresh: 10,
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



    return (
        <div>
            <Container>
            <Row>
                <Col size="md-12">
                    <div className="input-group input-group-sm mb-3">
                        <input type="text" className="form-control" placeholder="Add food to 😋..." onChange={handleInputChange} />


                        <button className="btn btn-warning" type="button" style={{ color: "black" }} onClick={handleAddFood} value="pantry">Pantry</button>
                        <button className="btn btn-info" type="button" value="fridge" onClick={handleAddFood}>Fridge</button>

                    </div>
                </Col>
            </Row>

            
            <Row>
            
                <Col size="md-4">

                    {/* Added Legend section - Zo */}
                    <h4>Food Status*</h4>
                    <ul>
                        <li style={{marginBottom:"10px"}}><span style = {{backgroundColor:"#22B24C", borderRadius:"5px", padding:"5px"}}>Fresh 🤤</span></li>
                        <li style={{marginBottom:"10px"}}><span style = {{backgroundColor:"#FFA500", borderRadius:"5px", padding:"5px"}}>Edible 🙂</span></li>
                        <li style={{marginBottom:"10px"}}><span style = {{backgroundColor:"#FF0000", borderRadius:"5px", padding:"5px"}}>Expired 😓</span></li>
                    </ul>
                </Col>

                <Col size="md-4">

                    {/* David's code */}
                    <h4>Search Suggestions: </h4>
                    
                    {nada || renderSearch}
    
                </Col>

              
                <Col size="md-4">

                    {/* Added Hever's food expiration date selection react code into Pantry page - Zo */}
                    <div >
                        {/* Adding this so it works good in mobile */}
                    <br className="mobile-break" />
                        <p style={{ fontWeight: "bold", borderRadius: "10px" }}>Enter expiration date:</p>
                        <DayPickerInput onDayChange={day => console.log(day)} />
                    </div>
                    
                </Col>
               
            </Row>
            </Container>
        </div>
    )




}

export default InputFood