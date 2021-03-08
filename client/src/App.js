import React from "react"
import UserProvider from "./Providers/UserProvider";
import Application from "./components/Application/index"

//on 3/8 David commented out the UserProvider to get around the firebase error
function App() {

  return (
    // <UserProvider>
    <Application />
    // </UserProvider>
  );
}

export default App;
