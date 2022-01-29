import axios from "axios";
import {ICoordinates} from "../interfaces/Places";

const URL: string = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw: ICoordinates, ne: ICoordinates) => {
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
                'x-rapidapi-key': '644ed62cb1msh30f994522eeaf55p1d05e3jsnad35c2fbf1d3'
            }
        };
        const {data: {data}} = await axios.get(URL, options);
        return data;
    } catch (err: unknown) {
        console.log(err)
    }
}
