import React, {FC, useState} from 'react';
import {AppBar, Box, InputBase, Toolbar, Typography} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import {Autocomplete} from "@react-google-maps/api";
import SearchIcon from '@mui/icons-material/Search';
import useStyles from "./styles"
import {IBounds, ICoordinates, IPlace} from "../../interfaces/Places";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export interface HeaderProps {
    setCoordinates: (value: ICoordinates | ((prevVar: ICoordinates ) => ICoordinates)) => void;
}

const Header: FC<HeaderProps> = ({ setCoordinates }) => {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState<any>(null);

    const loadHandler = (autoComplete: any) => {
        setAutocomplete(autoComplete);
    }

    const placeChangedHandler = () => {
        const lat = autocomplete?.getPlace().geometry.location.lat();
        const lng = autocomplete?.getPlace().geometry.location.lng();

        setCoordinates({lat, lng});
    }

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Map
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Find new places
                    </Typography>
                    <Autocomplete onLoad={loadHandler} onPlaceChanged={placeChangedHandler}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
