
export interface IContextProps {

    routeDistance: string,

    activeLicensePlate: string,

    activePoiType: string,

    activeRadius: string,

    routeInfoVisibility: boolean,
    origin: {
        lat: number,
        lng: number
    },
    destiny: {
        lat: number,
        lng: number
    },

    locations: Array<any>
    markers: Array<any>, 
    map: any,
    mapRef: React.MutableRefObject<any>
    mapLoaded: boolean
    originMarker: any,
    destinyMarker: any,

    markerVisibility: boolean,
    isSearchingForPOI: boolean


    setRouteDistance: React.Dispatch<React.SetStateAction<string>>,

    setRouteInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setMarkerVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setOrigin: (value:{
        lat: number;
        lng: number;
    }) => void;
    setDestiny: (value:{
        lat: number;
        lng: number;
    }) => void;


    setActiveLicensePlate: React.Dispatch<React.SetStateAction<string>>,
    setActivePoiType: React.Dispatch<React.SetStateAction<string>>,
    setActiveRadius: React.Dispatch<React.SetStateAction<string>>,

    setLocations: (value: any) => void, 
    setMarkers: (value: any) => void, 
    setMap: React.Dispatch<React.SetStateAction<any>>,
    setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>,

    setOriginMarker: (value: any) => void
    setDestinyMarker: (value: any) => void,
    setIsSearchingForPOI: (value: any) => void,

    handleMarkerVisibility: (value: any) => void,
    handleRouteVisibility: (value: any) => void,
    clearMarkers: () => void
    clearRoutes: () => void
    clearLocations: () => void
}