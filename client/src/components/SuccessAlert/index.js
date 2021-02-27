import React from "react";
import Alert from 'react-bootstrap/Alert'

function SuccessAlert(props) {
    return (
        <Alert show={props.show} key={props.index} variant='success'>
            {props.name} record successfully updated!
        </Alert>
    )
}


export default SuccessAlert;