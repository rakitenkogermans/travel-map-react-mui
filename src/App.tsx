import React from 'react';
import {createTheme, CssBaseline, Grid} from "@mui/material";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import {ThemeProvider} from "@mui/styles";

const App = () => {
    const theme = createTheme();
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Grid container spacing={3} style={{width: '100%'}}>
                    <Grid item xs={12} md={4}>
                        <List />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Map />
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
};

export default App;
