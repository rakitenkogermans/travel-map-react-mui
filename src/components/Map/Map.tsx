import React, {FC} from 'react';
import {useMediaQuery} from "@mui/material";
import useStyles from "../Map/styles";
import GoogleMapReact from 'google-map-react';
import {IBounds, ICoordinates} from "../../interfaces/Places";

export interface MapProps {
    setCoordinates: (value: ICoordinates | ((prevVar: ICoordinates ) => ICoordinates)) => void;
    setBounds: (value: IBounds | null | ((prevVar: IBounds | null) => IBounds | null)) => void;
    coordinates: ICoordinates;
}

const Map: FC<MapProps> = ({ setCoordinates, setBounds, coordinates }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    // const coordinates = { lat: 0, lng: 0};
    const mapChangeHandler = (event: any) => {
        console.log(event);
        setCoordinates({ lat: event.center.lat, lng: event.center.lng});
        setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw});
    }

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCgC03RFj7Pv_ay9oaM-izTRBHsq8gA4uQ' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                onChange={mapChangeHandler}
            >

            </GoogleMapReact>
        </div>
    );
};

export default Map;
