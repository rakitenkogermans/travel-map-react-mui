import axios from "axios";
import {ICoordinates} from "../interfaces/Places";
import {Type} from "../App";

export const getPlacesData = async (type: Type, sw: ICoordinates, ne: ICoordinates) => {
    try {
        const options = {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPID_API_TRAVEL_API_KEY as string
            }
        };
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, options);
        return data;
    } catch (err: unknown) {
        console.log(err)
    }
}

export const getWeatherData = async (lat: number, lng: number) => {
    try {
        if (lat && lng) {
            const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
                params: {
                    lon: lng,
                    lat: lat,
                },
                headers: {
                    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                    'x-rapidapi-key': process.env.RAPID_API_WEATHER_API_KEY as string
                }
            });
            return data;
        }
    } catch (err: unknown) {
        console.log(err)
    }
}
