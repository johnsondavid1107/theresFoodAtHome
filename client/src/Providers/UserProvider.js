import React, {useEffect, useState} from "react"
import { auth, generateUserDocument } from "../utils/firebase";

import UserContext from "../utils/UserContext";

function UserProvider(){

    const [user, setUser] = useState('');

    useEffect(()=>{
        auth.onAuthStateChanged(async userAuth=>{
            const user = await generateUserDocument(userAuth)
            setUser(user)
        })
    },[])

    return(
        <UserContext.Provider value={user}>
            {this.props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;

