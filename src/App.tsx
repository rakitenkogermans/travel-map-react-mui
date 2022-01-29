import React, {useEffect, useState} from 'react';
import {createTheme, CssBaseline, Grid} from "@mui/material";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import {ThemeProvider} from "@mui/styles";
import {getPlacesData} from "./api";
import {IBounds, ICoordinates, IPlace} from "./interfaces/Places";

const App = () => {
    const [places, setPlaces] = useState<IPlace[]>([]);
    const [coordinates, setCoordinates] = useState<ICoordinates>({ lat: 0, lng: 0});
    const [bounds, setBounds] = useState<IBounds | null>(null);
    const theme = createTheme();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude}}: GeolocationPosition) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const fetchPlaces = async () => {
            if (bounds) {
                const response: IPlace[] = await getPlacesData(bounds?.sw, bounds?.ne);
                // console.log(JSON.stringify(response[0]));
                // console.log(response);
                setPlaces(response);
            }
        }
        fetchPlaces();
    }, [coordinates, bounds])
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Grid container spacing={3} style={{width: '100%'}}>
                    <Grid item xs={12} md={4}>
                        <List places={places}/>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Map
                            setCoordinates={setCoordinates}
                            setBounds={setBounds}
                            coordinates={coordinates}
                        />
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
};

export default App;
