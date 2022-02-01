import React, {FC} from 'react';
import {Paper, Typography, useMediaQuery} from "@mui/material";
import useStyles from "./styles";
import GoogleMapReact from 'google-map-react';
import {IBounds, ICoordinates, IPlace} from "../../interfaces/Places";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Rating from '@mui/material/Rating';
import MarkerCustom from "../MarkerCustom";
import mapStyles from "./mapStyles";

export interface MapProps {
    setCoordinates: (value: ICoordinates | ((prevVar: ICoordinates ) => ICoordinates)) => void;
    setBounds: (value: IBounds | null | ((prevVar: IBounds | null) => IBounds | null)) => void;
    coordinates: ICoordinates;
    places: IPlace[];
    setChildClicked: (value: string | null | ((prevVar: string | null) => string | null)) => void;
    weatherData: any[];
}

const Map: FC<MapProps> = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    const mapChangeHandler = (event: any) => {
        // console.log(event);
        setCoordinates({ lat: event.center.lat, lng: event.center.lng});
        setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw});
    }

    const childClickHandler = (child: string) => {
        console.log('clicked', child);
        setChildClicked(child);
    }

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY as string }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={mapChangeHandler}
                onChildClick={childClickHandler}
            >
                {places?.map((place: IPlace, i: number) => (
                    <MarkerCustom
                        key={i}
                        className={classes.markerContainer}
                        lat={Number(place?.latitude)}
                        lng={Number(place?.longitude)}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnIcon color="primary" fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={+place.rating} readOnly />
                                </Paper>
                            )
                        }
                    </MarkerCustom>
                ))}
                {/*{weatherData?.list?.map((weather, i) => (*/}
                {/*    <div key={i} lat={weather.coord.lat} lng={weather.coord.lng}>*/}
                {/*        <img height={100} src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/>*/}
                {/*    </div>*/}
                {/*))}*/}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
