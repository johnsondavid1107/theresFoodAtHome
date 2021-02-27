import React from "react"
import UserProvider from "./Providers/UserProvider";
import Application from "./components/Application/index"


function App() {  

  return (
    <UserProvider>
      <Application/>
    </UserProvider>
  );
}

export default App;
