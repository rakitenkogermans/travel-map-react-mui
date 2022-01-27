import React from 'react';
import {useMediaQuery} from "@mui/material";
import useStyles from "../Map/styles";
import GoogleMapReact from 'google-map-react';

const Map = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    const coordinates = { lat: 0, lng: 0};

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCgC03RFj7Pv_ay9oaM-izTRBHsq8gA4uQ' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}

            >

            </GoogleMapReact>
        </div>
    );
};

export default Map;
