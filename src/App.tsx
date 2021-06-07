import React from "react";
import Routes from "./routes/Routes";
import {Box, makeStyles} from "@material-ui/core";
import ApiProvider from "./api/ApiProvider";
import "./App.css";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: 500,
        margin: "auto",
        left: 0,
        right: 0,
        padding: theme.spacing(1),
    },
}));

function App() {
    const classes = useStyles();

    return (
        <ApiProvider>
            <Box className={classes.mainContainer} p={2}>
                <Routes />
            </Box>
        </ApiProvider>
    );
}

export default App;
