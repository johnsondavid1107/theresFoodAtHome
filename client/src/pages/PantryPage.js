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
    //on 3/8 David commented out line 32 to get around Firebase error.  When firebase is fixed, delete lines 33-35 and uncomment line 32
    // const user = this.context
    const user = {
      uid: "LqE8A5H13dQxbZKrGgjjfSWEkrD2"
    }

    if (user) {

      return (<Pantry />)
    } else {
      return (null)
    }

  }



}

export default PantryPage;


