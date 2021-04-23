export const POI_OPTIONS: Array<{ value: any, label: string }> = [
    { value: '(gas_station) OR (food) OR (hotels)', label: 'View All' },
    { value: 'gas_station', label: 'Gas Stations' },
    { value: 'food', label: 'Restaurants' },
    { value: 'hotels', label: 'Hotels' },
]

export const RADIUS_OPTIONS: Array<{ value: any, label: string }> = [
    { value: '1000', label: '1 km' },
    { value: '5000', label: '5km' },
    { value: '10000', label: '10km' },
    { value: '30000', label: '30km' },
]

export enum MAP_ICONS {
    'gas_station' = '/assets/icn-gas-station.png',
    'restaurant' = '/assets/icn-restaurant.png',
    'lodging' = '/assets/icn-hotel.png'
}
export enum GPS_MARKERS_PATH {
    FIRST_POINT = '/assets/icn-first-location.png',
    POINT = '/assets/icn-path.png'
}
export enum LISBON_COORDINATES {
    lat = 38.722252,
    lng = -9.139337
}
export const MAPS_STYLES = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 50
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]