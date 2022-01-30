import React, {createRef, FC, useEffect, useState} from 'react';
import useStyles from "./styles";
import {
    Box, CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
    useMediaQuery
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import {IPlace} from "../../interfaces/Places";

export interface ListProps {
    places: IPlace[];
    childClicked: string | null;
    isLoading: boolean;
}

const List: FC<ListProps> = ({ places, childClicked, isLoading }) => {
    const classes = useStyles();
    const [type, setType] = useState<'restaurants' | 'hotels' | 'attractions'>('restaurants');
    const [rating, setRating] = useState<'0' | '3' | '4' | '4.5'>('0');
    const [elRefs, setElRefs] = useState<any[]>([]);

    useEffect(() => {
        setElRefs((refs) => Array.from({ length: places?.length}, (_, index) => refs[index] || createRef()));
    }, [places]);

    const typeHandler = (event: SelectChangeEvent) => {
        setType(event.target.value as 'restaurants' | 'hotels' | 'attractions');
    };

    const ratingHandler = (event: SelectChangeEvent) => {
        setRating(event.target.value as '0' | '3' | '4' | '4.5');
    };

    return (
        <div className={classes.container}>
            <Typography variant="h5">Restaurants, Hotels & Attractions around you</Typography>
                {isLoading ? (
                    <div className={classes.loading}>
                        <CircularProgress size="5rem" />
                    </div>
                ): (
                    <>
                        <Box sx={{mb: 3}}>
                            <FormControl className={`${classes.formControl} ${classes.marginBottom}`} sx={{m: 1, minWidth: 140}}>
                                <InputLabel>Type</InputLabel>
                                <Select value={type} onChange={typeHandler} label="Type">
                                    <MenuItem value="restaurants">Restaurants</MenuItem>
                                    <MenuItem value="hotels">Hotels</MenuItem>
                                    <MenuItem value="attractions">Attractions</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={`${classes.formControl} ${classes.marginBottom}`} sx={{m: 1, minWidth: 120}}>
                                <InputLabel>Rating</InputLabel>
                                <Select value={rating} onChange={ratingHandler} label="Rating">
                                    <MenuItem value={'0'}>All</MenuItem>
                                    <MenuItem value={'3'}>Above 3</MenuItem>
                                    <MenuItem value={'4'}>Above 4</MenuItem>
                                    <MenuItem value={'4.5'}>Above 4.5</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Grid container spacing={3} className={classes.list}>
                            {places?.map((place: IPlace, i: number) => (
                                <Grid item key={i} xs={12} sx={{mb: 3}}>
                                    <PlaceDetails
                                        place={place}
                                        selected={Number(childClicked) === i}
                                        refProp={elRefs[i]}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
        </div>
    );
};

export default List;
