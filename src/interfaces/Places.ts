export interface IPlace {
    location_id:                               string;
    name:                                      string;
    latitude:                                  string;
    longitude:                                 string;
    num_reviews:                               string;
    timezone:                                  string;
    location_string:                           string;
    photo:                                     Photo;
    awards:                                    Award[];
    doubleclick_zone:                          string;
    preferred_map_engine:                      string;
    raw_ranking:                               string;
    ranking_geo:                               string;
    ranking_geo_id:                            string;
    ranking_position:                          string;
    ranking_denominator:                       string;
    ranking_category:                          string;
    ranking:                                   string;
    distance:                                  null;
    distance_string:                           null;
    bearing:                                   string;
    rating:                                    string;
    is_closed:                                 boolean;
    open_now_text:                             string;
    is_long_closed:                            boolean;
    price_level:                               string;
    description:                               string;
    web_url:                                   string;
    write_review:                              string;
    ancestors:                                 Ancestor[];
    category:                                  Category;
    subcategory:                               Category[];
    parent_display_name:                       string;
    is_jfy_enabled:                            boolean;
    nearest_metro_station:                     any[];
    phone:                                     string;
    website:                                   string;
    email:                                     string;
    address_obj:                               AddressObj;
    address:                                   string;
    hours:                                     Hours;
    is_candidate_for_contact_info_suppression: boolean;
    cuisine:                                   Category[];
    dietary_restrictions:                      Category[];
    booking:                                   Booking;
    reserve_info:                              ReserveInfo;
    establishment_types:                       Category[];
}

export interface AddressObj {
    street1:    string;
    street2:    string;
    city:       string;
    state:      string | null;
    country:    string;
    postalcode: string;
}

export interface Ancestor {
    subcategory: Category[];
    name:        string;
    abbrv:       string | null;
    location_id: string;
}

export interface Category {
    key:  string;
    name: string;
}

export interface Award {
    award_type:   string;
    year:         string;
    images:       AwardImages;
    categories:   any[];
    display_name: string;
}

export interface AwardImages {
    small: string;
    large: string;
}

export interface Booking {
    provider: string;
    url:      string;
}

export interface Hours {
    week_ranges: Array<WeekRange[]>;
    timezone:    string;
}

export interface WeekRange {
    open_time:  number;
    close_time: number;
}

export interface Photo {
    images:         PhotoImages;
    is_blessed:     boolean;
    uploaded_date:  string;
    caption:        string;
    id:             string;
    helpful_votes:  string;
    published_date: string;
    user:           User;
}

export interface PhotoImages {
    small:     Large;
    thumbnail: Large;
    original:  Large;
    large:     Large;
    medium:    Large;
}

export interface Large {
    width:  string;
    url:    string;
    height: string;
}

export interface User {
    user_id:   string | null;
    member_id: string;
    type:      string;
}

export interface ReserveInfo {
    id:                 string;
    provider:           string;
    provider_img:       string;
    url:                string;
    booking_partner_id: string | null;
    racable:            boolean;
    api_bookable:       boolean;
    timeslots:          null;
    bestoffer:          null;
    timeslot_offers:    null;
    button_text:        string;
    disclaimer_text:    null;
    banner_text:        null;
}


export interface ICoordinates {
    lat: number;
    lng: number;
}

export interface IBounds {
    sw: ICoordinates;
    ne: ICoordinates;
}
