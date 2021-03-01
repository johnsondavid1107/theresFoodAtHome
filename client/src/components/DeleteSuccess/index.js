import React from "react";
import Alert from 'react-bootstrap/Alert'

function SuccessAlert(props) {
    //Can add another parameter for type - delete vs update
    return (
        <Alert show={props.show} key={props.index} variant="danger">
            {props.name} record successfully deleted from your pantry!
        </Alert>
    )
}


export default SuccessAlert;