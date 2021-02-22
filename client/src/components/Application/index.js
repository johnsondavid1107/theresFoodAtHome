import React, { useContext } from "react"
import Pantry from "../../pages/Pantry";
import Recipes from "../../pages/Recipes";
import Logout from "../../pages/Logout";
//import AccessDenied from "../../pages/AccessDenied";
//if NoMatch is removed, it changes the placement of Pantry in yellow on the pantry page..
import NoMatch from "../../pages/NoMatch";

import NavBar from "../NavBar";
import Footer from "../Footer/Footer";
import SignIn from "../RichSignIn/index"
import SignUp from "../RichSignUp/index"
import PwReset from "../../pages/PasswordReset"
import UserContext from "../../utils/UserContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function Application() {
    const user = useContext(UserContext);

    return (

        user ?

            <Router>

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
                        {/* <AccessDenied /> */}
                    </Route>



                </Switch>

                <Footer />
            </Router>

            :

            <Router>

                <NavBar />

                <Switch>

                    <Route exact path={["/", "/signin"]}>
                        <SignIn />
                    </Route>

                    <Route exact path="/signup">
                        <SignUp />
                    </Route>

                    <Route exact path="/reset" >
                        <PwReset />
                    </Route>

                    {/* Added per Rich - Zo */}
                    <Route>
                        {/* <AccessDenied /> */}
                    </Route>

                </Switch>

                <Footer />
            </Router>

    );
}

export default Application;
