import React from "react"
import UserProvider from "./Providers/UserProvider";
import Application from "./components/Application/index"


// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() {


  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;
