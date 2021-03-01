import React from "react"
import PantryPage from "../../pages/PantryPage";
import RecipePage from "../../pages/RecipePage";
import Logout from "../../pages/Logout";
import NoMatch from "../../pages/NoMatch";
import NavBar from "../NavBar";
import Footer from "../Footer/Footer";
import SignIn from "../SignIn/index"
import SignUp from "../SignUp/index"
import PwReset from "../../pages/PasswordReset"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";



function Application() {


    return (

        <Router>

            <NavBar />

            <Switch>

                <Route exact path={["/", "/signin"]}>
                    <SignIn />
                </Route>

                <Route exact path={"/pantry"}>
                    <PantryPage />
                </Route>

                <Route exact path="/recipes">
                    <RecipePage />
                </Route>

                <Route exact path="/logout">
                    <Logout />
                </Route>

                <Route exact path="/signup">
                    <SignUp />
                </Route>

                <Route exact path="/reset" >
                    <PwReset />
                </Route>

                <Route exact path="/accessdenied">
                    <AccessDenied />
                </Route>

                <Route>
                    <NoMatch />
                </Route>

            </Switch>

            <Footer />
        </Router>

    );
}

export default Application;
