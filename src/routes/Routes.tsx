import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {HOME, DETAILS} from "./paths";
import HomeScreen from "../pages/HomeScreen";
import CatDetailsScreen from "../pages/CatDetailsScreen";
import UseNavigation from "./useNavigation";

export default function Routes(): JSX.Element {
    const [privateStateParams, setPrivateStateParams] = useState();

    return (
        <UseNavigation.Provider
            value={{privateStateParams, setPrivateStateParams}}
        >
            <Router>
                <Switch>
                    <Route exact strict path={HOME} component={HomeScreen} />
                    <Route path={DETAILS} component={CatDetailsScreen} />
                </Switch>
            </Router>
        </UseNavigation.Provider>
    );
}
