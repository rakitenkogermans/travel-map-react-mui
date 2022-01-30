import React, {FC} from 'react';

export interface MarkerCustomProps {
    lat: number;
    lng: number;
    className: any;
    children: React.ReactNode;
}

const MarkerCustom: FC<MarkerCustomProps> = ({ lat, lng, className, children}) => {
    return (
        <div
            className={className}
            data-lat={lat}
            data-lng={lng}
        >
            {children}
        </div>
    );
};

export default MarkerCustom;
