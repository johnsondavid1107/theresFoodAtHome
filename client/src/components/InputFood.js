import React, { useEffect, useContext, useState } from "react"
import API from "../utils/API"
import { Col, Container, Row } from "../components/Grid"
// Added new imports to make calender work on page for food expiration - Zo/Hever
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import UserContext from "../utils/UserContext"
import PantryCard from "./PantryCard"
import FridgeCard from "./FridgeCard"
import { DateTime } from 'luxon'

//David - I might need to turn this whole thing into a class component

function InputFood(props) {

    //sets value of the input to send up to the users database.  TolowerCase placed in the object going to the database in handleAddFood function
    const [foodChoice, setFood] = useState("");

    //onload call all items from database and setting as state.
    const [allFoods, setAllFoods] = useState([]);

    //holding all foods set as state from above using a filter function to search all foods as the user types
    const [placeHolderFood, setPlaceHolderFood] = useState()

    //keeping track of what is placed in the input field to know when it is empty.  When it is empty "Nothing searched yet will display"
    const [inputVal, setInputVal] = useState("");


    const [daysFresh, setDaysFresh] = useState(0);
    const [todayDate, setTodayDate] = useState("");
    //sending state (prop drill) down to pantry and fridge cards with a buttonclick
    const [renderState, setRenderState] = useState();
    const [suggestDate, setSuggestDate] = useState()
    const [dateEntered, setDateEntered] = useState("")


    const user = useContext(UserContext)


    useEffect(() => {
        console.log(user)
        API.getUser(user.uid).then(function (response) { console.log(response.data) })
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        setTodayDate(today);
        //bring the entire databse allFOod collection down and set it as state.  Then search that state for event.target.value of user input.  If found render in placeholder.  If no match, take value and send up copy to the all foods database with the shelflife
        API.getFoods(user.uid).then(function (response) {
            console.log(response.data[0].allFoods)


            if (response.data[0].allFoods.length === 0) {
                let nothing = {
                    name: "nothing"
                }
                setAllFoods(nothing)
                return
            } else {
                setAllFoods(response.data[0].allFoods)
                console.log(response.data[0].allFoods)


            }



        })




    }, [])

    const getSuccessInfo = (index, name) => {
        console.log(index);
        console.log(name);
    }





    function handleInputChange(event) {
        const { value } = event.target
        setInputVal(value)


        console.log(allFoods)
        setFood(value.toLowerCase())
        if (allFoods.length === 1) {
            return
        } else {


            setPlaceHolderFood(allFoods.filter(option =>
                option.name.toLowerCase().includes(value.toLowerCase()))
            )


        }
    }

    function handleAddFood(event) {
        console.log(allFoods)



        if (foodChoice === null || foodChoice.trim() === "") {
            console.log(typeof (foodChoice))
            alert("Please enter in a value")

            return
        } else if
            (dateEntered === null || dateEntered.trim() === "") {
            console.log(typeof (dateEntered))
            alert("Please select a date")
            return
        } else {
            console.log(typeof (foodChoice))
            let combo = {
                user: user.uid,
                name: foodChoice.toLowerCase(),
                dateOfPurchase: todayDate,
                daysFresh: daysFresh,
                spoiled: false,
                location: event.target.value,

            }

            console.log(combo)
            API.makeFood(combo).then(function (response) {
                console.log(response)


                API.getFoods(combo.user).then(function (answer) {
                    console.log(answer)
                    setRenderState(answer)
                })

            });

            let newAllFood = {
                name: foodChoice,
                daysFresh: daysFresh,
                user: user.uid
            }
            API.checkAllFoods(newAllFood).then(function (response2) {
                if (response2 === undefined) {
                    return
                } else {
                    console.log(response2)
                }
            })

        }
    }

    function handleDaysFresh(event) {
        console.log(event.target.id)
        console.log(todayDate)
        console.log(event.target.name)

        let date = (DateTime.now().plus({ days: event.target.value }))

        console.log(date)

        console.log(date.c.day)

        console.log(date.c.month)

        console.log(date.c.year)

        setSuggestDate(`${date.c.year}-${date.c.month}-${date.c.day}`)

        setInputVal(event.target.name)
        setFood(event.target.name)





        //Talk to Julie about it to see if we can append the new day fresh in the value of the calendar on click.  Need help calculating the new expiration date from today and value of days fresh from button click.  

    }

    function handleClear(event) {

        API.clearAllFoods().then(function (response) {
            console.log("Cleared all database")
            setPlaceHolderFood(response)
            console.log(response)


        })







        alert("All Suggestions cleared!")

    }

    if (placeHolderFood === undefined || inputVal === "") {
        var nada = "Nothing searched yet"
    } else {
        console.log(placeHolderFood)
        var renderSearch = placeHolderFood.map((item, index) =>
            <button className="btn btn-outline-success" type="button" key={index} id={item._id} value={item.daysFresh} onClick={handleDaysFresh} name={item.name.charAt(0).toUpperCase() + item.name.slice(1)}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</button>



        )

        var deleteButn = <button className="btn btn-outline-danger" type="button" onClick={handleClear}> Clear All </button>

    }

    const handleDayChange = date => {

        date = JSON.stringify(date);
        console.log(date)


        let monthString = date[6] + date[7];
        let dayString = date[9] + date[10];
        let yearString = date[1] + date[2] + date[3] + date[4];
        let dateString = `${monthString}/${dayString}/${yearString}`;

        let date1 = new Date(dateString)
        console.log(date1)
        console.log(dateString)
        // let today = new Date();
        // let dd = String(today.getDate()).padStart(2, '0');
        // let mm = String(today.getMonth() + 1).padStart(2, '0');
        // let yyyy = today.getFullYear();

        // today = mm + '/' + dd + '/' + yyyy;

        let daysFreshNum = Math.floor((new Date(date1) - new Date(todayDate)) / (1000 * 3600 * 24));

        setDaysFresh(daysFreshNum);
        setDateEntered(date)


    }


    return (
        <div>
            <Container>
                <Row>
                    <Col size="md-12">
                        <div className="input-group input-group-sm mb-3">
                            <input type="text" className="form-control" placeholder="Add food to 😋..." onChange={handleInputChange} value={inputVal} />


                            <button className="btn btn-warning" type="button" style={{ color: "black" }} type="button" onClick={handleAddFood} value="pantry">Pantry</button>
                            <button className="btn btn-info" type="button" value="fridge" onClick={handleAddFood}>Fridge</button>



                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">

                        {/* David's code */}
                        <h4 style={{ textAlign: "center", textDecoration: "underline", fontWeight: "800" }}>Search Suggestions:</h4>

                        {nada || renderSearch}

                    </Col>

                </Row>
                {deleteButn || ""}

                <br />
                <Row>
                    <Col size="md-6">

                        {/* Added Legend section - Zo */}
                        <h4>Food Status*</h4>

                        <p style={{ marginBottom: "10px", listStyle: "none" }}><span style={{ backgroundColor: "#22B24C", borderRadius: "5px", padding: "5px" }}>Fresh 🤤</span></p>
                        <p style={{ marginBottom: "10px", listStyle: "none" }}><span style={{ backgroundColor: "#FFA500", borderRadius: "5px", padding: "5px" }}>Edible 🙂</span></p>
                        <p style={{ marginBottom: "10px", listStyle: "none" }}><span style={{ backgroundColor: "#FF0000", borderRadius: "5px", padding: "5px" }}>Expired 😓</span></p>

                    </Col>




                    <Col size="md-6">

                        {/* Added Hever's food expiration date selection react code into Pantry page - Zo */}
                        <div style={{ float: "right" }}>
                            {/* Adding this so it works good in mobile */}
                            <br className="mobile-break" />
                            <p style={{ fontWeight: "bold", borderRadius: "10px" }}>Enter expiration date:</p>
                            <DayPickerInput
                                onDayChange={handleDayChange} placeholder={suggestDate}

                            />
                        </div>

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col size="md-12">
                        <div className="Box-1">

                            <PantryCard currentUser={user.uid}
                                key={user.uid}
                                getSuccessInfo={getSuccessInfo}
                                render={renderState} />


                        </div>
                    </Col>

                </Row>

                {/* Do not touch - Zo ensures page is responsive during laptop view*/}
                <br className="mobile" /> <br />

                <Row>
                    <Col size="md-12">


                        <div className="Box-2" >


                            <FridgeCard
                                currentUser={user.uid}
                                key={user.uid}
                                getSuccessInfo={getSuccessInfo}
                                render={renderState}

                            />

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )




}

export default InputFood