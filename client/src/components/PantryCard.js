import React from "react"
import API from "../utils/API"

class PantryCard extends React.Component {

    componentDidMount() {
        let idNum = 1
        API.getPantryItems(idNum).then(function (result) {
            console.log(result.data)
        })

    }



    render() {
        return (
            <div>

                <h3 className="align-Header">Pantry</h3>

                {/* First Card, Pantry - Zo */}
                <div className="card mb-3" style={{ maxWidth: "500px" }}>
                    <div className="row no-gutters">

                        <div className="col-md-8">
                            <div className="card-body">
                                <ul>
                                    <li>Milk</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3" style={{ maxWidth: "500px" }}>
                    <div className="row no-gutters">

                        <div className="col-md-8">
                            <div className="card-body">
                                <ul>
                                    <li>Egg</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3" style={{ maxWidth: "500px" }}>
                    <div className="row no-gutters">

                        <div className="col-md-8">
                            <div className="card-body">
                                <ul>
                                    <li>Tomato</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3" style={{ maxWidth: "500px" }}>
                    <div className="row no-gutters">

                        <div className="col-md-8">
                            <div className="card-body">
                                <ul>
                                    <li>1</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second card, Pantry- Zo */}
                <div className="card mb-3" style={{ maxWidth: "500px" }}>
                    <div className="row no-gutters">

                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Zo's Jelly</h5>
                                <p className="card-text" style={{ color: "white" }}>Grape jelly, picked and squished together from heaven by the Great Zo and packed into a jar</p> <button type="button" className="btn btn-danger">Delete</button>
                                <p className="card-text"><small className="text-muted">Added 5 mins ago, on 2/14/2021 @ 7: 57 pm</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

export default PantryCard