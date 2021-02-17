import React from "react"
import Pantry from "./pages/Pantry";
import Recipes from "./pages/Recipes";
import Logout from "./pages/Logout";
import NoMatch from "./pages/NoMatch";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";
import UserProvider from "./Providers/UserProvider";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() 
{
  return (
    <UserProvider>   
    <Router>
    <div>
    <NavBar />
      <Switch>
        <Route exact path={["/", "/pantry"]}>
          <Pantry />
        </Route>
        <Route exact path="/recipes">
          <Recipes />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
      <Footer />
    </div>
    </Router>
    </UserProvider>
  );
}

export default App;
