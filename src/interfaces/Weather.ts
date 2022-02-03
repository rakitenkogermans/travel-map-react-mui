export interface Weather {
    message: string;
    cod:     string;
    count:   number;
    list:    IList[];
}

export interface IList {
    id:      number;
    name:    string;
    coord:   Coord;
    main:    Main;
    dt:      number;
    wind:    Wind;
    sys:     Sys;
    rain:    null;
    snow:    null;
    clouds:  Clouds;
    weather: Weather[];
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface Main {
    temp:        number;
    feels_like:  number;
    temp_min:    number;
    temp_max:    number;
    pressure:    number;
    humidity:    number;
    sea_level?:  number;
    grnd_level?: number;
}

export interface Sys {
    country: string;
}

export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Wind {
    speed: number;
    deg:   number;
}
