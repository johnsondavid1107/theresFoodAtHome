import React from "react";
import Pantry from "./pages/Pantry";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from "./Providers/UserProvider";

// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() {
  return (
    <UserProvider>   
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path={["/", "/pantry"]}>
              <Pantry />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
