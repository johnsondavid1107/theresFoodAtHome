import React from "react";
import Alert from 'react-bootstrap/Alert'

function SuccessAlert(props) {
    return (
        <Alert show={props.show} key={props.index} variant={props.name}>
            This is a {props.name} alert—check it out!
        </Alert>
    )
}


export default SuccessAlert;