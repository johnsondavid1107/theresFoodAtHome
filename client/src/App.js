import React from "react";
import Pantry from "./pages/Pantry";
import Hot from "./pages/Hot";
import Cold from "./pages/Cold";
import NoMatch from "./pages/NoMatch";
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() 
{
  return (
    <Router>
    <div>
    <NavBar />
    {/* <Footer /> */}
      <Switch>
        <Route exact path={["/", "/pantry"]}>
          <Pantry />
        </Route>
        <Route exact path="/hot">
          <Hot />
        </Route>
        <Route exact path="/cold">
          <Cold />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
