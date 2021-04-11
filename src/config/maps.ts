export const POI_OPTIONS:Array<{value: any, label: string}> = [
    { value: '(gas_station) OR (food) OR (hotels)' , label: 'View All' },
    { value: 'gas_station' , label: 'Gas Stations' },
    { value: 'food' , label: 'Restaurants' },
    { value: 'hotels' , label: 'Hotels' },
]

export const RADIUS_OPTIONS:Array<{value: any, label: string}> = [
    { value: '1000' , label: '1 km' },
    { value: '5000' , label: '5km' },
    { value: '10000' , label: '10km' },
    { value: '30000' , label: '30km' },
]

export const MAP_ICONS = {
    'gas_station': '/assets/icn-gas-station.png',
    'restaurant': '/assets/icn-restaurant.png',
    'lodging': '/assets/icn-hotel.png'
}