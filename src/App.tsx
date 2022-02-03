import React, {useEffect, useState} from 'react';
import {createTheme, CssBaseline, Grid} from "@mui/material";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import {ThemeProvider} from "@mui/styles";
import {getPlacesData, getWeatherData} from "./api";
import {IBounds, ICoordinates, IPlace} from "./interfaces/Places";
import {Weather, IList} from "./interfaces/Weather";

export enum Type {
    RESTAURANTS = 'restaurants',
    HOTELS = 'hotels',
    ATTRACTIONS = 'attractions'
}

export enum Rating {
    ZERO = '0',
    THREE = '3',
    FOUR = '4',
    FOURHALF = '4.5'
}

const App = () => {
    const [places, setPlaces] = useState<IPlace[]>([]);
    const [filteredPlaces, setFilteredPlaces] = useState<IPlace[]>([]);

    const [weatherData, setWeatherData] = useState<IList[]>([]);

    const [coordinates, setCoordinates] = useState<ICoordinates>({ lat: 0, lng: 0});
    const [bounds, setBounds] = useState<IBounds | null>(null);

    const [childClicked, setChildClicked] = useState<string | null>(null);

    const [type, setType] = useState<Type>(Type.RESTAURANTS);
    const [rating, setRating] = useState<Rating>(Rating.ZERO);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const theme = createTheme();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude}}: GeolocationPosition) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const fetchPlaces = async () => {
            if (bounds?.sw && bounds?.ne) {
                setIsLoading(true);
                const placesRes: IPlace[] = await getPlacesData(type, bounds?.sw, bounds?.ne);
                const weatherRes: Weather = await getWeatherData(coordinates.lat, coordinates.lng);
                setWeatherData(weatherRes.list);
                setPlaces(placesRes?.filter((place: IPlace) => place.name && +place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsLoading(false);
            }
        }
        fetchPlaces();
    }, [type, bounds]);

    useEffect(() => {
        const filteredPlaces = places.filter((place: IPlace) => +place.rating > +rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header setCoordinates={setCoordinates} />
                <Grid container spacing={3} style={{width: '100%'}}>
                    <Grid item xs={12} md={4}>
                        <List
                            places={filteredPlaces.length ? filteredPlaces : places}
                            childClicked={childClicked}
                            isLoading={isLoading}
                            type={type}
                            setType={setType}
                            rating={rating}
                            setRating={setRating}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Map
                            setCoordinates={setCoordinates}
                            setBounds={setBounds}
                            coordinates={coordinates}
                            places={filteredPlaces.length ? filteredPlaces : places}
                            setChildClicked={setChildClicked}
                            weatherData={weatherData}
                        />
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
};

export default App;
