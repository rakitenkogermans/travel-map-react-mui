import React, {FC} from 'react';
interface PlaceDetailsProps {
    place: any
}
const PlaceDetails: FC<PlaceDetailsProps> = ({ place }) => {
    return (
        <h1>
            {place.name}
        </h1>
    );
};

export default PlaceDetails;
