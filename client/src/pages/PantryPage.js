import Pantry from "../components/Pantry/Pantry"
import React, { Component } from "react"
import UserContext from "../utils/UserContext"
import { auth, generateUserDocument } from "../utils/firebase"


class PantryPage extends Component {

  static contextType = UserContext


  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);

      if (user) {
        return null
      } else {
        window.location.href = "/accessdenied"

      }


    });
  };




  render() {

    const user = this.context


    if (user) {

      return (<Pantry />)
    } else {
      return (null)
    }

  }



}

export default PantryPage;


